import { KnowledgeChunk } from '@/types/funnel';

/**
 * Knowledge Base para el sistema RAG
 * Contiene expertise de LeadMadness Show, HubSpot Loop Marketing,
 * estrategias B2B y metodologías de Alex Hormozi
 */
export const KNOWLEDGE_CHUNKS: KnowledgeChunk[] = [
  {
    id: 'lm-001',
    categoria: 'lead-magnet',
    subcategoria: 'errores-criticos',
    contenido: `
      7 ERRORES CRÍTICOS AL CREAR UN LEAD MAGNET:

      1. Lanzar sin validar interés del mercado
         - Problema: Crear contenido que nadie quiere
         - Solución: Test A/B con muestra pequeña antes de escalar

      2. Promesa débil o poco clara
         - Problema: No diferenciarse de la competencia
         - Solución: Promesa específica, medible y diferenciada

      3. Diseño poco atractivo
         - Problema: Baja conversión por apariencia amateur
         - Solución: Invertir en diseño profesional desde el inicio

      4. Mensaje genérico
         - Problema: No resuena con la audiencia específica
         - Solución: Personalización por segmento y pain point

      5. No iterar tras feedback inicial
         - Problema: Mantener versión que no convierte
         - Solución: Proceso de mejora continua basado en datos

      6. No testear antes de escalar
         - Problema: Gastar presupuesto en algo que no funciona
         - Solución: Validación con tráfico pequeño primero

      7. Desconexión con el producto final
         - Problema: Leads que no califican para tu oferta
         - Solución: Alinear lead magnet con value ladder

      MÉTRICAS CLAVE:
      - Tasa de conversión del opt-in: >30% es bueno
      - Tasa de apertura emails: >40% indica interés real
      - Click-through rate: >10% muestra engagement
      - Lead-to-customer: >2% es aceptable para B2B
    `,
    fuente: 'LeadMadness EP.23',
    tags: ['lead-magnet', 'conversion', 'validacion', 'errores'],
    ejemplos: [
      'Quiz interactivo en vez de ebook genérico',
      'Calculator tool en vez de descargable',
      'Video training en vez de PDF',
      'Template/plantilla lista para usar'
    ],
    insights_clave: [
      'Validar interés antes de lanzar ahorra 80% del tiempo',
      'Promesa y posicionamiento claro es más importante que diseño',
      'Iterar tras feedback inicial puede duplicar conversión',
      'Lead magnet debe ser primer paso natural hacia producto principal'
    ]
  },

  {
    id: 'lm-002',
    categoria: 'automatizacion',
    subcategoria: 'workflows-clave',
    contenido: `
      8 AUTOMATIZACIONES CLAVE PARA AUMENTAR VENTAS:

      1. Email Marketing Automatizado por Segmentos
         - Personalización basada en comportamiento
         - Triggers: descarga, abandono carrito, inactividad
         - ROI: 4200% promedio en email marketing

      2. Chatbots Inteligentes (IA + Reglas)
         - Calificación automática de leads 24/7
         - Respuestas inmediatas a preguntas frecuentes
         - Derivación a humano cuando es necesario

      3. Lead Scoring Automático
         - Puntuación basada en acciones y atributos
         - Priorización automática para equipo ventas
         - Aumenta eficiencia comercial 40-60%

      4. Triggers de Comportamiento
         - Email cuando visita pricing 3+ veces
         - SMS cuando abandona proceso checkout
         - Notificación a ventas con lead caliente

      5. Segmentación Dinámica
         - Actualización automática de listas
         - Basada en interacciones y preferencias
         - Permite personalización a escala

      6. Nurturing Multicanal
         - Secuencias coordinadas: email + retargeting + SMS
         - Contenido adaptado a etapa del funnel
         - Follow-up sin intervención manual

      7. Re-engagement Campaigns
         - Detección de inactividad
         - Campañas win-back automatizadas
         - Recupera 10-15% de leads fríos

      8. Follow-up Secuencial
         - Cadencias automáticas post-demo
         - Recordatorios de trials próximos a expirar
         - Onboarding automatizado post-compra

      CRM RECOMENDADOS POR CASO DE USO:
      - HubSpot: Mejor para inbound + automatización integral
      - ActiveCampaign: Mejor para email automation avanzado
      - Pipedrive: Mejor para sales pipeline B2B
      - Keap: Mejor para pequeños negocios
      - Salesforce: Mejor para enterprise con necesidades complejas

      STACK COMPLEMENTARIO:
      - Zapier/Make: Integración entre herramientas
      - Calendly: Scheduling automático
      - Intercom/Drift: Chat conversacional
      - Typeform: Formularios inteligentes
    `,
    fuente: 'LeadMadness EP.22',
    tags: ['automatizacion', 'crm', 'email-marketing', 'workflows'],
    ejemplos: [
      'Secuencia automática 7 días post-webinar',
      'Lead scoring: +10 pts por visita pricing, +20 por descargar caso estudio',
      'Trigger: Si lead no abre 3 emails, cambiar a canal SMS',
      'Re-engagement: Email "Te extrañamos" a 60 días inactividad'
    ],
    insights_clave: [
      'Automatización reduce tiempo comercial 70%',
      'Triggers personalizados aumentan conversión 40%',
      'Lead scoring mejora calificación y reduce perseguir leads fríos',
      'Multicanal (email+SMS+retargeting) tiene 3x mejor conversión que un solo canal'
    ]
  },

  {
    id: 'lm-003',
    categoria: 'webinar',
    subcategoria: 'conversion-hacks',
    contenido: `
      5 HACKS PARA WEBINARS QUE VENDEN:

      1. Storytelling desde Minuto 1
         - No empezar con quién eres
         - Empezar con historia de transformación
         - Hook emocional en primeros 90 segundos
         - Ejemplo: "Hace 2 años, perdí $50k porque no sabía..."

      2. Oferta en Directo (NO enviar después)
         - Urgencia real: solo para asistentes en vivo
         - Bonos exclusivos que expiran al terminar
         - Price anchor: mostrar valor completo vs precio especial
         - Timer visible durante presentación de oferta

      3. Limitación de Plazas Real
         - Límite genuino basado en capacidad de entrega
         - Mostrar cupos restantes en tiempo real
         - Explicar el "por qué" del límite (mantiene exclusividad/calidad)

      4. Bonos Exclusivos para Asistentes
         - Valor agregado que resuelve objeción principal
         - Relacionado pero diferente al producto core
         - Ejemplo: Template + training si vendes consultoría

      5. Seguimiento Automático Post-Evento
         - Email inmediato: replay + oferta por 24h
         - WhatsApp/SMS al día siguiente para no compradores
         - Secuencia 7 días con contenido + soft pitch
         - Encuesta a no compradores para entender objeciones

      ESTRUCTURA GANADORA (90 minutos):

      0-15 min: ENGANCHE
      - Historia personal de transformación
      - Resultado específico que van a aprender
      - Credibilidad rápida (resultados, testimonios)

      15-45 min: CONTENIDO DE VALOR
      - Framework o metodología específica
      - 3-5 pasos accionables
      - Ejemplos y casos de éxito
      - Elementos "aha!" que generan deseo

      45-60 min: TRANSICIÓN + OFERTA
      - "Ahora, cómo implementar esto más rápido..."
      - Presentación del producto/servicio
      - Proof: testimonios, resultados, garantía
      - Stack de valor + precio especial
      - CTA clara con bonos y límite de tiempo

      60-75 min: Q&A ESTRATÉGICO
      - Responder objeciones principales
      - Reforzar beneficios clave
      - Recordar bonos y urgencia
      - Más testimonios intercalados

      HERRAMIENTAS RECOMENDADAS:
      - StreamYard: Mejor para producción profesional multistream
      - Zoom: Más estable, mejor para interacción
      - EverWebinar: Automatización de webinars
      - Demio: Especializado en marketing webinars
      - WebinarJam: Features avanzados de conversión

      MÉTRICAS OBJETIVO:
      - Show-up rate: 30-50% (de registrados)
      - Engagement: 40%+ permanece hasta oferta
      - Conversion rate: 2-5% para productos $500-2000
      - Replay conversions: 30% de las ventas totales
    `,
    fuente: 'LeadMadness EP.21',
    tags: ['webinar', 'conversion', 'storytelling', 'urgencia'],
    ejemplos: [
      'Webinar: "Cómo generé $100k en 90 días con esta estrategia"',
      'Bonus: Acceso a comunidad privada solo para compradores hoy',
      'Stack: Curso ($997) + Templates ($297) + 2 coaching calls ($600) = $1894 → Hoy $497',
      'Follow-up: Email con replay + deadline 24h, luego SMS personalizado'
    ],
    insights_clave: [
      'Storytelling conecta mejor que datos puros - genera emoción',
      'Urgencia ética (plazas limitadas reales) genera acción sin manipulación',
      'Automatización post-evento crucial - captura 30-40% ventas adicionales',
      'Q&A bien manejado cierra objeciones y aumenta conversión 20-30%'
    ]
  },

  {
    id: 'b2b-001',
    categoria: 'b2b',
    subcategoria: 'prospecting-stack',
    contenido: `
      STACK DE PROSPECCIÓN B2B (TOP 1% DE EQUIPOS):

      === INBOUND: SEÑALES DE INTENCIÓN ===

      Prosp.ai
      - Señales sociales: quién está activo en eventos, grupos, discusiones
      - Identifica prospects en modo compra
      - Alertas de trigger events

      Trigify.io
      - Tracking de engagement en contenido
      - Identifica visitantes anónimos
      - Scoring por comportamiento

      === LEAD DISCOVERY: ENCONTRAR PROSPECTS ===

      Apollo.io
      - Base de datos 270M+ contactos
      - Filtros: industria, tamaño, tech stack, señales de crecimiento
      - Secuencias de outreach integradas

      Apify
      - Web scraping personalizado
      - Búsqueda por tech stack usado
      - Extracción de LinkedIn, directorios, webs

      Crunchbase
      - Empresas con funding reciente
      - Rondas de inversión (trigger de compra)
      - Expansión geográfica, nuevas contrataciones

      Ocean.io
      - Lookalike audiences con IA
      - Encuentra empresas similares a mejores clientes
      - Scoring predictivo de conversión

      TheirStack
      - Monitoreo de tech stack de empresas
      - Alertas cuando adoptan/cambian tecnologías
      - Identifica budget para tu categoría

      PhantomBuster
      - Automatización LinkedIn (con moderación)
      - Extracción de asistentes a eventos
      - Export de miembros de grupos

      === CUALIFICACIÓN Y ENRICHMENT ===

      Clearbit
      - Enriquecimiento automático de datos
      - Info empresa: tamaño, industria, tech stack
      - Info contacto: rol, antigüedad, social profiles

      Clay
      - Web scraping inteligente
      - Combina datos de múltiples fuentes
      - Personalización a escala con IA

      Semrush
      - Tráfico web de prospects
      - Keywords que posicionan
      - Presupuesto estimado de ads
      - Competidores identificados

      FullEnrich
      - Financial data de empresas
      - Revenue estimado
      - Employee growth rate
      - Funding history

      === OUTREACH: CONTACTO PERSONALIZADO ===

      Copy.ai / Anthropic Claude
      - Generación de copy personalizado
      - A/B testing de mensajes
      - Adapta tono a industria/persona

      Smartlead / Instantly.ai
      - Cold email a escala
      - Múltiples mailboxes para evitar spam
      - A/B testing automático
      - Warming de dominios

      RocketReach / BetterContact
      - Email finding con verificación
      - Números de teléfono directos
      - Múltiples fuentes para precisión

      === COMBINACIÓN GANADORA (EJEMPLO DE WORKFLOW) ===

      1. Crunchbase: Identificar empresas con funding reciente en tu sector
      2. TheirStack: Filtrar las que usan tech stack compatible
      3. Apollo: Extraer contactos de decisores
      4. Clearbit + Clay: Enriquecer con datos adicionales
      5. Copy.ai: Generar emails personalizados por industria/rol
      6. Smartlead: Ejecutar secuencia multicanal
      7. Prosp.ai: Priorizar quienes muestran señales de intención
      8. CRM: Los que responden pasan a secuencia de ventas

      COSTOS MENSUALES (STACK COMPLETO):
      - Tier Startup: ~$500-800/mes
      - Tier Growth: ~$1,200-2,000/mes
      - Tier Scale: ~$3,000-5,000/mes
    `,
    fuente: 'Estrategias B2B Avanzadas',
    tags: ['b2b', 'prospecting', 'herramientas', 'outbound', 'lead-generation'],
    ejemplos: [
      'Workflow SaaS: Crunchbase (funding) → Apollo (CTOs) → Clay (personalización) → Smartlead',
      'Workflow Agency: LinkedIn Sales Nav → PhantomBuster → Clearbit → Cold email',
      'Workflow Enterprise: ZoomInfo → 6sense → Salesloft → Outreach',
      'Señal de intención: Empresa visita pricing 3x + descarga whitepaper = prioridad alta'
    ],
    insights_clave: [
      'Combinar inbound + outbound multiplica alcance por 10x',
      'Cualificación previa ahorra 60% tiempo comercial - enfoque en ready-to-buy',
      'Personalización (no masivo genérico) aumenta reply rate de 1% a 8-15%',
      'Tech stack monitoring identifica prospects con budget para tu categoría',
      'Timing es crucial: contactar durante trigger event (funding, contratación, migración) aumenta conversión 5x'
    ]
  },

  {
    id: 'hubspot-001',
    categoria: 'optimizacion',
    subcategoria: 'loop-marketing',
    contenido: `
      LOOP MARKETING - FRAMEWORK HUBSPOT 2025

      Evolución del Inbound Marketing tradicional para era multi-plataforma con IA

      === CONTEXTO: POR QUÉ CAMBIÓ EL JUEGO ===

      Antes (Inbound Tradicional):
      - Google era el centro del discovery
      - Funnel lineal: búsqueda → blog → conversión
      - SEO + contenido = suficiente

      Ahora (Loop Marketing):
      - Compradores usan 6+ plataformas antes de comprar
      - 58% búsquedas Google sin clic (zero-click searches)
      - Descubrimiento en: YouTube, Reddit, TikTok, Podcasts, LinkedIn
      - IA modifica cómo se consume y descubre contenido

      === LAS 4 ETAPAS DEL LOOP ===

      🎯 ETAPA 1 - DEFINICIÓN

      Objetivo: Definir quién eres y qué representas (posicionamiento claro)

      Acciones:
      - Crear Brand Voice Guide usando IA
      - Analizar reviews y feedback de clientes (IA extrae patterns)
      - Mapear posicionamiento deseado vs percibido
      - Definir puntos de diferenciación únicos

      Herramientas:
      - IA para analizar sentimiento en reviews
      - Social listening tools
      - Customer interview mining

      Output:
      - Brand positioning statement
      - Tone of voice guidelines
      - Mensajes clave por audiencia

      ---

      🎨 ETAPA 2 - ADAPTACIÓN

      Objetivo: Personalizar experiencia para cada visitante (no superficial)

      Acciones:
      - Segmentación por comportamiento, no solo demográficos
      - Contenido dinámico en web según visitante
      - Personalización de email basada en interacciones previas
      - Recomendaciones de productos con IA

      Niveles de personalización:
      1. Básico: Nombre en email
      2. Intermedio: Contenido por industria
      3. Avanzado: Experiencia web dinámica por comportamiento
      4. Elite: Predicción de necesidades con IA

      Herramientas:
      - HubSpot Smart Content
      - Dynamic Yield
      - Optimizely
      - IA para análisis comportamiento

      Impacto:
      - 20% aumento conversión con personalización básica
      - 40-60% con personalización avanzada

      ---

      📢 ETAPA 3 - AMPLIFICACIÓN

      Objetivo: Llevar mensaje correcto a máximas personas correctas

      Estrategias:

      A) Reutilización Inteligente de Contenido (IA-powered)
         - 1 pieza core → 20+ variaciones
         - Ejemplo: Webinar → Blog post → 5 LinkedIn posts → 10 tweets →
           YouTube short → Carrusel Instagram → Newsletter → Podcast clip

      B) Multi-Plataforma Estratégica
         - Cada plataforma tiene propósito único:
         - YouTube: Educación profunda, SEO video
         - LinkedIn: Thought leadership B2B
         - Reddit: Participación en comunidades nicho
         - Podcasts: Awareness y credibilidad
         - TikTok/Shorts: Viralidad y alcance joven

      C) Colaboración con Creadores
         - Micro-influencers en nicho (mejor ROI que mega-influencers)
         - Co-creación de contenido
         - Guest posts cruzados
         - Podcast interviews

      D) Paid Amplification Inteligente
         - Retargeting multi-plataforma coordinado
         - Lookalike audiences
         - Boost a top performing organic content

      Herramientas:
      - IA para repurposing: Opus Clip, Descript, Castmagic
      - Scheduling: Buffer, Hootsuite
      - Analytics: Dash Hudson, Sprout Social

      ---

      📊 ETAPA 4 - OPTIMIZACIÓN

      Objetivo: Aprender rápido, ajustar en tiempo real, mejorar continuamente

      Acciones:

      A) A/B Testing Continuo
         - No solo en ads, en TODO
         - Subject lines, CTAs, layouts, ofertas
         - Implementar ganadores rápido

      B) Analítica Avanzada
         - Más allá de vanity metrics
         - Attribution modeling multi-touch
         - Customer journey mapping
         - Predictive analytics con IA

      C) Feedback Loop Automático
         - Datos de ventas → Marketing
         - Interacciones chat → Producto
         - Reviews → Contenido
         - IA identifica patterns y sugiere ajustes

      D) Iteración Rápida
         - Sprint mentality en marketing
         - Weekly/bi-weekly optimization cycles
         - Kill what doesn't work, double down on winners

      Herramientas:
      - Google Analytics 4 + IA insights
      - Hotjar/Clarity para behavior analytics
      - Attribution tools: HubSpot, Ruler Analytics
      - BI tools: Tableau, Looker

      === CIERRE DEL LOOP ===

      Los aprendizajes de OPTIMIZACIÓN alimentan:
      - DEFINICIÓN: Ajustar posicionamiento basado en qué resuena
      - ADAPTACIÓN: Mejorar personalización con datos comportamiento
      - AMPLIFICACIÓN: Invertir más en canales/formatos que funcionan

      Este ciclo continuo crea mejora compuesta (compound improvement)

      === DIFERENCIA CLAVE vs INBOUND TRADICIONAL ===

      Inbound Tradicional:
      - Google-céntrico
      - Lineal: atracción → conversión
      - Optimización lenta (trimestral)

      Loop Marketing:
      - Multi-plataforma
      - Cíclico: optimización continua
      - IA + humano para escalar personalización
      - Adaptación rápida (semanal)

      === IMPLEMENTACIÓN RECOMENDADA ===

      Mes 1-2: DEFINICIÓN
      - Auditoría de marca y posicionamiento
      - Brand voice guide
      - Mensaje core y variaciones

      Mes 3-4: ADAPTACIÓN
      - Implementar personalización básica
      - Segmentación de audiencia
      - Smart content en web

      Mes 5-6: AMPLIFICACIÓN
      - Content repurposing system
      - Expandir a 2-3 plataformas nuevas
      - Partnership con micro-influencers

      Ongoing: OPTIMIZACIÓN
      - A/B testing semanal
      - Review mensual de métricas
      - Ajustes basados en data
    `,
    fuente: 'Loop Marketing HubSpot 2025',
    tags: ['loop-marketing', 'hubspot', 'inbound', 'omnichannel', 'ia', 'personalizacion'],
    ejemplos: [
      'Loop completo: Define brand voice → Personaliza web por industria → Amplifica en LinkedIn+YouTube → Optimiza con A/B testing → Refina brand voice',
      'Repurposing: 1 case study → blog post → LinkedIn carousel → YouTube video → email series → webinar → podcast',
      'Personalización: Visitante SaaS ve casos SaaS, ecommerce ve casos ecommerce',
      'Optimización: CTAs azules convierten 30% más → Cambiar todos los CTAs a azul'
    ],
    insights_clave: [
      'Compradores hoy usan 6+ plataformas antes de decidir - estar en una sola es insuficiente',
      '58% búsquedas Google sin clic - necesitas presencia directa en plataformas',
      'IA + toque humano = crecimiento sin perder autenticidad',
      'Personalización real (no solo nombre) aumenta conversión 40-60%',
      'Loop continuo de optimización genera mejora compuesta - small wins suman 10x en año',
      'Micro-influencers en nicho tienen mejor ROI que mega-influencers genéricos'
    ]
  },

  {
    id: 'hormozi-001',
    categoria: 'optimizacion',
    subcategoria: 'value-ladder-hormozi',
    contenido: `
      ESCALERA DE VALOR - ALEX HORMOZI

      Concepto: Maximizar el lifetime value (LTV) ofreciendo productos/servicios
      ascendentes que resuelven problemas más profundos o complejos.

      === ESTRUCTURA DE VALUE LADDER ===

      Nivel 1: LEAD MAGNET (Gratis o $1-10)
      - Objetivo: Captar atención, construir confianza
      - Formato: Ebook, checklist, mini-curso, tool, quiz
      - Ejemplo: "Calculadora de ROI de Marketing" (gratis)

      Nivel 2: TRIPWIRE / LOW-TICKET ($27-97)
      - Objetivo: Convertir en comprador (psychological barrier break)
      - Formato: Mini-curso, template pack, workshop grabado
      - Ejemplo: "Kit de 30 Templates de Email Marketing" ($47)
      - Key: Precio irresistible (10x valor percibido)

      Nivel 3: CORE OFFER / MID-TICKET ($297-2,000)
      - Objetivo: Solución completa al problema principal
      - Formato: Curso completo, programa grupal, software
      - Ejemplo: "Programa 90 Días Maestría en Funnels" ($997)
      - Key: Aquí está tu mejor margen y volumen

      Nivel 4: HIGH-TICKET ($3,000-15,000)
      - Objetivo: Implementación personalizada, mentoría
      - Formato: Consultoría, done-for-you, retainer
      - Ejemplo: "Implementación Done-For-You de Funnel + 6 meses coaching" ($8,500)
      - Key: Menos clientes, más atención, mayor transformación

      Nivel 5: PREMIUM / VIP ($20,000+)
      - Objetivo: Máxima transformación, partnership
      - Formato: Retainer anual, equity partnership, mastermind
      - Ejemplo: "Partner Program: Co-creación de funnels + revenue share" ($50k/año)
      - Key: Solo para clientes ideales, relación a largo plazo

      === PRINCIPIOS HORMOZI ===

      1. AUMENTAR VALOR PERCIBIDO (sin aumentar costo)
         - Más bonos
         - Mejor packaging
         - Escasez genuina
         - Garantías fuertes

      2. PRICE ANCHORING
         - Mostrar valor total antes de precio
         - Ejemplo: "Valor $5,000 → Hoy $997"
         - Desglosar cada componente

      3. STACK DE BONOS
         - Cada bonus resuelve objeción específica
         - Bonus 1: Acelera resultados (templates)
         - Bonus 2: Elimina excusas (soporte extra)
         - Bonus 3: Reduce riesgo (garantía extendida)

      4. URGENCIA Y ESCASEZ ÉTICA
         - Limitación real (capacidad de entrega)
         - Deadline genuino (cohort empieza X fecha)
         - Precio aumenta tras fecha (early bird legítimo)

      5. GARANTÍA SÓLIDA
         - Reversa de riesgo total
         - Ejemplo: "Si no generas $10k en 90 días, te doy $1,000"
         - Aumenta conversión 20-40%

      === APLICACIÓN PRÁCTICA ===

      Ejemplo: Agencia de Marketing Digital

      Level 1 (Lead Magnet): Auditoría gratis de funnel actual
      ↓
      Level 2 (Tripwire $97): Workshop "30 días para optimizar tu funnel"
      ↓
      Level 3 (Core $1,997): Programa 12 semanas con templates y soporte
      ↓
      Level 4 (High-Ticket $8,500): Done-for-you implementación + 6 meses coaching
      ↓
      Level 5 (Premium $30k/año): Retainer mensual full-service

      === MÉTRICAS DE ÉXITO ===

      - % que sube de Level 1 a 2: objetivo 3-8%
      - % que sube de Level 2 a 3: objetivo 10-20%
      - % que sube de Level 3 a 4: objetivo 5-15%
      - Lifetime value (LTV) objetivo: 5-10x costo de adquisición (CAC)

      === ERRORES COMUNES ===

      1. Saltos muy grandes entre niveles (precio o complejidad)
      2. No tener oferta core rentable (depender solo de high-ticket)
      3. Forzar a todos al nivel más alto (no todos están listos)
      4. No nurturing entre niveles (asumir auto-ascenso)
      5. Value ladder sin relación lógica (productos inconexos)
    `,
    fuente: 'Alex Hormozi - $100M Offers & Value Ladder',
    tags: ['value-ladder', 'pricing', 'hormozi', 'ltv', 'upsell'],
    ejemplos: [
      'SaaS: Free trial → Starter $29/mo → Pro $99/mo → Enterprise custom → White-label partnership',
      'Coach: Quiz gratis → Ebook $27 → Curso $497 → Coaching grupal $3k → 1-on-1 $15k',
      'Ecommerce: Lead magnet (receta) → Libro $19 → Kit productos $97 → Suscripción mensual $47',
      'Consultoría: Diagnóstico gratis → Workshop $197 → Proyecto pequeño $5k → Retainer $15k/mes'
    ],
    insights_clave: [
      'Tener solo producto high-ticket limita crecimiento - necesitas escalera completa',
      'Tripwire convierte prospectos en compradores - rompe barrera psicológica',
      'Cada nivel debe ser "no-brainer" - valor percibido 10x precio',
      'Nurturing entre niveles es crítico - no asumen automáticamente el siguiente paso',
      'LTV real viene de ascender clientes, no solo venta inicial',
      'Garantías sólidas eliminan riesgo y aumentan conversión 20-40%'
    ]
  },

  {
    id: 'copy-001',
    categoria: 'copywriting',
    subcategoria: 'frameworks',
    contenido: `
      FRAMEWORKS DE COPYWRITING PARA FUNNELS

      === PAS (Problem - Agitate - Solution) ===

      Uso: Emails, landing pages, ads

      1. Problem: Identifica el dolor
         "¿Inviertes en ads pero no sabes qué funciona?"

      2. Agitate: Profundiza en consecuencias
         "Sin tracking correcto, tiras dinero. No sabes qué campañas generan ROI.
         Tu equipo toma decisiones a ciegas. La competencia te come cuota de mercado."

      3. Solution: Presenta tu oferta
         "Dashboard Analytics en tiempo real te muestra exactamente qué funciona.
         Toma decisiones data-driven. Duplica ROI en 30 días."

      ---

      === AIDA (Attention - Interest - Desire - Action) ===

      Uso: Sales pages, VSLs, webinars

      1. Attention: Hook que detiene scroll
         "El error #1 que mata 90% de funnels (y cómo evitarlo)"

      2. Interest: Mantiene engagement
         "Después de analizar 1,000+ funnels, descubrí un patrón..."

      3. Desire: Crea necesidad emocional
         "Imagina lanzar campaigns sabiendo que van a funcionar.
         Ver leads llegar mientras duermes. Escalar sin aumentar trabajo."

      4. Action: CTA clara y urgente
         "Empieza tu trial gratis hoy - Solo 50 spots disponibles"

      ---

      === BEFORE-AFTER-BRIDGE ===

      Uso: Case studies, testimonials, storytelling

      Before: Estado actual doloroso
         "María gastaba $5k/mes en ads con 0.8% conversion rate"

      After: Estado deseado
         "Hoy genera $50k/mes con 4.2% conversion rate"

      Bridge: Cómo llegó ahí (tu solución)
         "Implementó nuestro framework de 3 pasos:
         1) Rehizo offer con value stack
         2) Optimizó landing con heatmaps
         3) Automatizó follow-up multicanal"

      ---

      === FEATURE-ADVANTAGE-BENEFIT (FAB) ===

      Uso: Product descriptions, demos

      Feature: Qué es
         "Dashboard con AI-powered insights"

      Advantage: Qué hace
         "Analiza patterns y recomienda optimizaciones"

      Benefit: Qué significa para el usuario
         "Ahorras 10 horas/semana de análisis manual
         y aumentas conversión 30% con sugerencias probadas"

      ---

      === QUEST (Qualify - Understand - Educate - Stimulate - Transition) ===

      Uso: Long-form sales letters, VSL

      Qualify: Identifica audiencia correcta
         "Si tienes un ecommerce facturando +$50k/mes pero tu LTV es bajo..."

      Understand: Muestra empatía
         "Sé lo frustrante que es tener ventas pero no profit.
         Ads cada vez más caros, clientes que compran una vez y desaparecen."

      Educate: Enseña algo nuevo
         "El problema no es tu producto. Es que no tienes value ladder.
         Clientes satisfechos comprarían más... pero no les ofreces nada."

      Stimulate: Crea deseo
         "Ahora imagina: mismo tráfico, pero cada cliente vale 3x más.
         Retention del 40%. Referidos automáticos. Márgenes sanos."

      Transition: Presenta oferta
         "Por eso creé el LTV Accelerator Program..."

      ---

      === ELEMENTOS PSICOLÓGICOS CLAVE ===

      1. ESPECIFICIDAD
         - Mal: "Aumenta ventas"
         - Bien: "Aumenta ventas 37% en 60 días"

      2. PRUEBA SOCIAL
         - "Más de 1,200 empresas confían en nosotros"
         - Testimonios específicos con nombre, foto, resultado

      3. ESCASEZ/URGENCIA
         - Limitación real: "Solo 10 spots este mes"
         - Deadline: "Oferta expira viernes 23:59"

      4. AUTORIDAD
         - "Según estudio Harvard..."
         - "Featured en Forbes, TechCrunch"

      5. RECIPROCIDAD
         - Dar valor antes de pedir
         - Lead magnets, contenido gratis, herramientas

      6. CONTRASTE
         - Mostrar antes/después
         - Comparar con alternativas peores

      7. STORYTELLING
         - Historias > datos cuando quieres emoción
         - Estructura: Héroe → Problema → Mentor → Solución → Transformación
    `,
    fuente: 'Copywriting Best Practices',
    tags: ['copywriting', 'conversion', 'frameworks', 'persuasion'],
    ejemplos: [
      'PAS Email: "Problema: Leads no califican → Agitación: Pierdes tiempo con tire-kickers → Solución: Lead scoring automático"',
      'AIDA Landing: "Atención: ¿$10k/mes en ads sin ROI claro? → Interés: Te enseño sistema → Deseo: Resultados en 30 días → Acción: Book demo gratis"',
      'Before-After: Cliente facturaba $20k → Ahora $100k → Usó nuestro framework X"',
      'FAB: Feature: Dashboard real-time → Advantage: Ve métricas al instante → Benefit: Decisiones rápidas = más profit"'
    ],
    insights_clave: [
      'Especificidad vende más que generalidades - "37% más ventas" > "más ventas"',
      'Historias crean conexión emocional, datos apoyan decisión racional - usa ambos',
      'Prueba social reduce riesgo percibido - testimoniales específicos son oro',
      'Urgencia ética (real) funciona - falsa urgencia destruye confianza',
      'Focus en BENEFICIOS (qué ganan) no features (qué es)',
      'CTA clara sin fricción - cada paso extra pierde 20-30% conversión'
    ]
  }
];

/**
 * Helper para búsqueda de conocimiento por categoría
 */
export function getKnowledgeByCategory(categoria: KnowledgeChunk['categoria']): KnowledgeChunk[] {
  return KNOWLEDGE_CHUNKS.filter(chunk => chunk.categoria === categoria);
}

/**
 * Helper para búsqueda de conocimiento por tags
 */
export function getKnowledgeByTags(tags: string[]): KnowledgeChunk[] {
  return KNOWLEDGE_CHUNKS.filter(chunk =>
    chunk.tags.some(tag => tags.includes(tag))
  );
}

/**
 * Helper para búsqueda de texto simple en el conocimiento
 */
export function searchKnowledge(query: string): KnowledgeChunk[] {
  const lowerQuery = query.toLowerCase();
  return KNOWLEDGE_CHUNKS.filter(chunk =>
    chunk.contenido.toLowerCase().includes(lowerQuery) ||
    chunk.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    chunk.insights_clave.some(insight => insight.toLowerCase().includes(lowerQuery))
  );
}
