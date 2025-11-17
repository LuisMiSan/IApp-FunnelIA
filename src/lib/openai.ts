import OpenAI from 'openai';
import { FunnelRequestForm, FunnelStrategy } from '@/types/funnel';
import { KNOWLEDGE_CHUNKS, searchKnowledge } from '@/data/knowledge-base';

// Validar que la API key de OpenAI esté configurada
if (!process.env.OPENAI_API_KEY) {
  throw new Error(
    'OPENAI_API_KEY no está configurada. Por favor, crea un archivo .env basado en .env.example ' +
    'y agrega tu API key de OpenAI. Obtén una en: https://platform.openai.com/api-keys'
  );
}

// Inicializar cliente de OpenAI con validación estricta
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Prompt del sistema para el generador de funnels
 */
const SYSTEM_PROMPT = `Eres un experto en funnels de ventas con 15 años de experiencia, especializado en:
- Estrategias de LeadMadness Show (automatización, webinars, lead magnets)
- Loop Marketing de HubSpot (Definición → Adaptación → Amplificación → Optimización)
- Metodologías B2B (prospección, cualificación, outreach)
- Frameworks de Alex Hormozi (value ladder, irresistible offers)

Tu tarea es analizar la información del cliente y generar un funnel personalizado que incluya:

1. DIAGNÓSTICO (análisis DAFO del estado actual con score 0-100)
2. ESTRATEGIA DE FUNNEL (etapas específicas adaptadas al cliente con tipo de funnel)
3. STACK TECNOLÓGICO (herramientas recomendadas con alternativas)
4. PLAN DE IMPLEMENTACIÓN (roadmap con quick wins para primeros 30 días)
5. KPIS Y MÉTRICAS (dashboard de seguimiento con objetivos realistas)
6. PRESUPUESTO DETALLADO (inversión por categoría con ROI esperado)
7. AUTOMATIZACIONES CLAVE (workflows específicos priorizados)

IMPORTANTE:
- Sé específico y accionable
- Basa recomendaciones en las mejores prácticas del conocimiento proporcionado
- Adapta TODO al contexto específico del cliente (industria, presupuesto, objetivos)
- Incluye quick wins para primeros 30 días
- Proporciona métricas realistas basadas en benchmarks de industria
- Prioriza según recursos disponibles

FORMATO DE SALIDA: JSON estructurado válido según el schema proporcionado`;

/**
 * Busca conocimiento relevante basado en el contexto del cliente
 */
function getRelevantKnowledge(formData: FunnelRequestForm): string {
  const queries = [
    formData.objetivoPrincipal,
    formData.industria,
    formData.modeloNegocio,
    ...formData.funnelActual.problemasActuales,
    ...formData.kpisAPriorizar,
  ];

  // Búsqueda simple - en producción usar embeddings
  const relevantChunks = new Set<string>();

  queries.forEach(query => {
    const results = searchKnowledge(query);
    results.slice(0, 2).forEach(chunk => {
      relevantChunks.add(chunk.id);
    });
  });

  // También agregar chunks por categoría
  const categoryMap: Record<string, string[]> = {
    'captacion': ['lead-magnet', 'b2b'],
    'conversion': ['webinar', 'copywriting', 'optimizacion'],
    'retencion': ['automatizacion', 'optimizacion'],
    'escalado': ['automatizacion', 'optimizacion', 'b2b'],
  };

  const categories = categoryMap[formData.objetivoPrincipal] || [];
  categories.forEach(cat => {
    const chunks = KNOWLEDGE_CHUNKS.filter(c => c.categoria === cat as any);
    chunks.slice(0, 1).forEach(chunk => {
      relevantChunks.add(chunk.id);
    });
  });

  const selectedChunks = KNOWLEDGE_CHUNKS.filter(c => relevantChunks.has(c.id));

  return selectedChunks.map(chunk => `
=== ${chunk.categoria.toUpperCase()} - ${chunk.subcategoria} ===
Fuente: ${chunk.fuente}

${chunk.contenido}

INSIGHTS CLAVE:
${chunk.insights_clave.map(i => `- ${i}`).join('\n')}

EJEMPLOS:
${chunk.ejemplos.map(e => `- ${e}`).join('\n')}
`).join('\n\n---\n\n');
}

/**
 * Genera una estrategia de funnel completa usando IA
 */
export async function generateFunnel(
  formData: FunnelRequestForm
): Promise<{ strategy: FunnelStrategy; generationTime: number }> {
  const startTime = Date.now();

  // 1. Obtener conocimiento relevante
  const relevantKnowledge = getRelevantKnowledge(formData);

  // 2. Construir el contexto
  const userPrompt = `
Genera una estrategia completa de funnel de ventas para el siguiente cliente:

=== INFORMACIÓN DEL CLIENTE ===
Nombre: ${formData.nombre}
Empresa: ${formData.empresa}
Industria: ${formData.industria}
Modelo de Negocio: ${formData.modeloNegocio}
Tamaño: ${formData.numeroEmpleados} empleados

=== SITUACIÓN ACTUAL ===
Descripción del funnel actual: ${formData.funnelActual.descripcion}
Etapas actuales: ${formData.funnelActual.etapas.join(', ')}
Herramientas usadas: ${formData.funnelActual.herramientasUsadas.join(', ')}
Problemas actuales: ${formData.funnelActual.problemasActuales.join(', ')}
${formData.funnelActual.tasaConversionActual ? `Tasa de conversión actual: ${formData.funnelActual.tasaConversionActual}%` : ''}

=== OBJETIVOS Y RECURSOS ===
Objetivo Principal: ${formData.objetivoPrincipal}
Presupuesto Mensual: ${formData.presupuestoMensual}
Tiempo para Implementación: ${formData.tiempoImplementacion}
KPIs a Priorizar: ${formData.kpisAPriorizar.join(', ')}

=== CLIENTE IDEAL ===
Perfil: ${formData.clienteIdeal.perfil}
Puntos de Dolor: ${formData.clienteIdeal.puntosDolor.join(', ')}
Canales Preferidos: ${formData.clienteIdeal.canalesPreferidos.join(', ')}

=== CONOCIMIENTO EXPERTO RELEVANTE ===
${relevantKnowledge}

=== INSTRUCCIONES ESPECÍFICAS ===
- El funnel debe ser implementable en ${formData.tiempoImplementacion}
- Presupuesto disponible: ${formData.presupuestoMensual}
- Prioriza estos KPIs: ${formData.kpisAPriorizar.join(', ')}
- CRÍTICO: Incluir quick wins específicos para los primeros 30 días
- Stack tecnológico debe ser compatible con equipo de ${formData.numeroEmpleados} personas
- Automatizaciones priorizadas según recursos disponibles

Devuelve un JSON válido con esta estructura EXACTA:

{
  "diagnostico": {
    "fortalezas": ["string"],
    "debilidades": ["string"],
    "oportunidades": ["string"],
    "amenazas": ["string"],
    "scoreActual": number (0-100)
  },
  "funnel": {
    "nombre": "string",
    "tipo": "lead-magnet" | "webinar" | "vsl" | "tripwire" | "application" | "hybrid",
    "etapas": [
      {
        "orden": number,
        "nombre": "string",
        "objetivo": "string",
        "tacticas": ["string"],
        "contenido": [
          {
            "tipo": "email" | "landing-page" | "webinar" | "video" | "ebook" | "blog-post" | "social-media" | "ad",
            "titulo": "string",
            "descripcion": "string",
            "cta": "string (opcional)"
          }
        ],
        "automatizaciones": ["string"],
        "metricasClave": ["string"],
        "tasaConversionEsperada": number
      }
    ],
    "escaleraValor": [
      {
        "nivel": number,
        "nombre": "string",
        "precio": number,
        "descripcion": "string",
        "deliverables": ["string"],
        "tiempoEntrega": "string"
      }
    ]
  },
  "stack": [
    {
      "categoria": "string",
      "herramienta": "string",
      "proposito": "string",
      "costo": "string",
      "alternativas": ["string"]
    }
  ],
  "roadmap": [
    {
      "fase": "string",
      "duracion": "string",
      "tareas": [
        {
          "titulo": "string",
          "descripcion": "string",
          "prioridad": "alta" | "media" | "baja",
          "estimacionHoras": number (opcional)
        }
      ],
      "quickWins": ["string"]
    }
  ],
  "kpis": [
    {
      "metrica": "string",
      "valorActual": number (opcional),
      "objetivo": number,
      "frecuenciaMedicion": "string"
    }
  ],
  "presupuesto": {
    "total": number,
    "desglose": [
      {
        "concepto": "string",
        "categoria": "herramientas" | "publicidad" | "contenido" | "personal" | "otros",
        "costoMensual": number,
        "esencial": boolean
      }
    ],
    "roi_esperado": "string"
  },
  "automatizaciones": [
    {
      "tipo": "string",
      "trigger": "string",
      "accion": "string",
      "herramienta": "string",
      "prioridad": "alta" | "media" | "baja"
    }
  ]
}
`;

  try {
    // 3. Llamada a OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 4000,
    });

    // 4. Parsear respuesta
    const responseContent = completion.choices[0].message.content;
    if (!responseContent) {
      throw new Error('No se recibió respuesta del modelo de IA');
    }

    const strategy: FunnelStrategy = JSON.parse(responseContent);

    const endTime = Date.now();
    const generationTime = endTime - startTime;

    return {
      strategy,
      generationTime,
    };
  } catch (error) {
    console.error('Error generando funnel:', error);
    throw error;
  }
}

/**
 * Genera recursos adicionales (plantillas, scripts, etc.)
 */
export async function generateAdditionalResources(
  strategy: FunnelStrategy,
  formData: FunnelRequestForm
): Promise<any[]> {
  // TODO: Implementar generación de recursos adicionales
  // Puede incluir: email templates, landing page copy, scripts de webinar, etc.
  return [];
}

/**
 * Valida la estructura de la estrategia generada
 */
export function validateStrategy(strategy: any): strategy is FunnelStrategy {
  // Validación básica - en producción usar Zod
  return (
    strategy.diagnostico &&
    strategy.funnel &&
    strategy.stack &&
    strategy.roadmap &&
    strategy.kpis &&
    strategy.presupuesto &&
    strategy.automatizaciones
  );
}
