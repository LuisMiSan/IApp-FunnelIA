// ============================================================================
// FORM TYPES - Input from users
// ============================================================================

export interface FunnelRequestForm {
  // Información Básica
  nombre: string;
  email: string;
  empresa: string;

  // Contexto del Negocio
  numeroEmpleados: '1-10' | '11-50' | '51-200' | '201-500' | '500+';
  industria: string;
  modeloNegocio: 'B2B' | 'B2C' | 'B2B2C' | 'Marketplace';

  // Funnel Actual
  funnelActual: {
    descripcion: string;
    etapas: string[];
    herramientasUsadas: string[];
    problemasActuales: string[];
    tasaConversionActual?: number;
  };

  // Objetivos y Recursos
  objetivoPrincipal: 'captacion' | 'conversion' | 'retencion' | 'escalado';
  presupuestoMensual: '0-1000' | '1000-5000' | '5000-15000' | '15000+';
  tiempoImplementacion: '1-mes' | '2-3-meses' | '3-6-meses' | '6-12-meses';
  kpisAPriorizar: string[];

  // Audiencia
  clienteIdeal: {
    perfil: string;
    puntosDolor: string[];
    canalesPreferidos: string[];
  };
}

// ============================================================================
// FUNNEL STRATEGY TYPES - AI Generated Output
// ============================================================================

export interface FunnelStrategy {
  // 1. Diagnóstico
  diagnostico: {
    fortalezas: string[];
    debilidades: string[];
    oportunidades: string[];
    amenazas: string[];
    scoreActual: number; // 0-100
  };

  // 2. Estrategia del Funnel
  funnel: {
    nombre: string;
    tipo: 'lead-magnet' | 'webinar' | 'vsl' | 'tripwire' | 'application' | 'hybrid';
    etapas: FunnelStage[];
    escaleraValor: ValueLadderItem[];
  };

  // 3. Stack Tecnológico
  stack: TechStackItem[];

  // 4. Plan de Implementación
  roadmap: RoadmapPhase[];

  // 5. KPIs
  kpis: KPI[];

  // 6. Presupuesto
  presupuesto: {
    total: number;
    desglose: BudgetItem[];
    roi_esperado: string;
  };

  // 7. Automatizaciones
  automatizaciones: Automatizacion[];

  // 8. Additional Resources
  recursos_adicionales?: RecursoAdicional[];
  plantillas?: Plantilla[];
}

export interface FunnelStage {
  orden: number;
  nombre: string;
  objetivo: string;
  tacticas: string[];
  contenido: ContentPiece[];
  automatizaciones: string[];
  metricasClave: string[];
  tasaConversionEsperada: number;
}

export interface ValueLadderItem {
  nivel: number;
  nombre: string;
  precio: number;
  descripcion: string;
  deliverables: string[];
  tiempoEntrega: string;
}

export interface TechStackItem {
  categoria: string;
  herramienta: string;
  proposito: string;
  costo: string;
  alternativas: string[];
}

export interface RoadmapPhase {
  fase: string;
  duracion: string;
  tareas: Task[];
  quickWins: string[];
}

export interface Task {
  titulo: string;
  descripcion: string;
  responsable?: string;
  prioridad: 'alta' | 'media' | 'baja';
  estimacionHoras?: number;
}

export interface KPI {
  metrica: string;
  valorActual?: number;
  objetivo: number;
  frecuenciaMedicion: string;
  formula?: string;
}

export interface BudgetItem {
  concepto: string;
  categoria: 'herramientas' | 'publicidad' | 'contenido' | 'personal' | 'otros';
  costoMensual: number;
  costoAnual?: number;
  esencial: boolean;
}

export interface Automatizacion {
  tipo: string;
  trigger: string;
  accion: string;
  herramienta: string;
  prioridad: 'alta' | 'media' | 'baja';
  descripcion?: string;
}

export interface ContentPiece {
  tipo: 'email' | 'landing-page' | 'webinar' | 'video' | 'ebook' | 'blog-post' | 'social-media' | 'ad';
  titulo: string;
  descripcion: string;
  cta?: string;
}

export interface RecursoAdicional {
  tipo: 'guia' | 'plantilla' | 'checklist' | 'script' | 'framework';
  nombre: string;
  descripcion: string;
  url?: string;
}

export interface Plantilla {
  nombre: string;
  tipo: 'email' | 'landing' | 'script' | 'documento';
  contenido: string;
  variables?: string[];
}

// ============================================================================
// KNOWLEDGE BASE TYPES - RAG System
// ============================================================================

export interface KnowledgeChunk {
  id: string;
  categoria: 'lead-magnet' | 'automatizacion' | 'webinar' | 'optimizacion' | 'b2b' | 'copywriting' | 'stack-tech';
  subcategoria: string;
  contenido: string;
  fuente: string;
  tags: string[];
  vector_embedding?: number[];
  ejemplos: string[];
  insights_clave: string[];
}

// ============================================================================
// API TYPES
// ============================================================================

export interface GenerateFunnelRequest {
  formData: FunnelRequestForm;
}

export interface GenerateFunnelResponse {
  success: boolean;
  strategy?: FunnelStrategy;
  error?: string;
  generationTime?: number;
}

// ============================================================================
// UI COMPONENT TYPES
// ============================================================================

export interface FunnelVisualizationProps {
  strategy: FunnelStrategy;
}

export interface DiagnosisData {
  fortalezas: string[];
  debilidades: string[];
  oportunidades: string[];
  amenazas: string[];
  scoreActual: number;
}
