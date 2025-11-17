# 🚀 FunnelIA - Generador Automático de Funnels de Ventas con IA

Aplicación web full-stack que genera automáticamente estrategias de funnels de ventas personalizadas, utilizando IA (OpenAI GPT-4) y una base de conocimientos experta basada en:

- 📚 Metodologías de LeadMadness Show
- 🔄 Loop Marketing de HubSpot
- 💎 Frameworks de Alex Hormozi (Value Ladder, $100M Offers)
- 🎯 Estrategias B2B comprobadas
- ⚡ Best practices de automatización y conversión

## 🎯 Características Principales

### 🤖 Generación Inteligente con IA
- Análisis DAFO completo del estado actual
- Estrategia de funnel personalizada con 5-7 etapas
- Stack tecnológico recomendado con alternativas
- Plan de implementación con quick wins para 30 días
- KPIs específicos con objetivos realistas
- Presupuesto detallado con ROI esperado
- Automatizaciones priorizadas

### 📊 Visualización Completa
- Dashboard interactivo con todas las métricas clave
- Visualización de escalera de valor
- Roadmap de implementación por fases
- Comparación de presupuesto y ROI

### 💾 Exportación
- Descarga en formato JSON
- Compartir estrategia
- Sistema preparado para PDF (pendiente de implementar)

## 🛠️ Stack Tecnológico

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Lenguaje**: TypeScript
- **UI**: shadcn/ui + Tailwind CSS
- **Forms**: React Hook Form + Zod validation
- **State**: React Hooks
- **Icons**: Lucide React

### Backend
- **API**: Next.js API Routes
- **IA**: OpenAI API (GPT-4 Turbo)
- **Database**: PostgreSQL + Prisma ORM (configurado, pendiente de conexión)
- **Validación**: Zod

### Infraestructura
- **Deploy**: Vercel (recomendado)
- **Env Management**: .env.local

## 📦 Instalación y Setup

### Prerrequisitos
- Node.js 18+ instalado
- npm o yarn
- Cuenta de OpenAI con API key
- (Opcional) PostgreSQL para persistencia de datos

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/IApp-FunnelIA.git
cd IApp-FunnelIA
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# OpenAI API (REQUERIDO)
OPENAI_API_KEY=sk-...

# Database (Opcional - para persistencia)
DATABASE_URL="postgresql://user:password@localhost:5432/funnel_ia?schema=public"

# Next.js (Opcional)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Anthropic Claude (Opcional - para análisis complejos)
ANTHROPIC_API_KEY="sk-ant-..."
```

**IMPORTANTE**: Necesitas una API key válida de OpenAI para que la aplicación funcione.

### 4. (Opcional) Configurar base de datos

Si quieres persistir las estrategias generadas:

```bash
# Generar Prisma Client
npx prisma generate

# Ejecutar migraciones
npx prisma migrate dev --name init

# (Opcional) Poblar base de datos con knowledge base
npx prisma db seed
```

### 5. Ejecutar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🎨 Uso de la Aplicación

### Paso 1: Completar el Formulario
Llena el formulario con información sobre:
- Tu información básica (nombre, email, empresa)
- Contexto del negocio (industria, modelo, tamaño)
- Situación actual de tu funnel
- Objetivos y recursos disponibles
- Perfil de tu cliente ideal

### Paso 2: Generar Estrategia
Haz clic en "Generar Mi Funnel con IA". La IA analizará tu información y generará una estrategia completa en ~30-60 segundos.

### Paso 3: Revisar Resultados
Explora tu estrategia personalizada que incluye:
- 📊 Diagnóstico DAFO con score actual
- 🎯 Funnel con etapas detalladas
- 💎 Escalera de valor (productos/servicios)
- 🛠️ Stack tecnológico recomendado
- 🗺️ Roadmap de implementación
- 📈 KPIs a seguir
- 💰 Presupuesto detallado
- ⚡ Automatizaciones clave

### Paso 4: Exportar
Descarga tu estrategia en JSON o compártela.

## 🧪 Testing

```bash
# Ejecutar tests (cuando estén implementados)
npm run test

# Build de producción
npm run build

# Ejecutar build de producción localmente
npm run start
```

## 📁 Estructura del Proyecto

```
IApp-FunnelIA/
├── prisma/
│   └── schema.prisma          # Esquema de base de datos
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── generate-funnel/
│   │   │       └── route.ts   # API endpoint para generar funnels
│   │   ├── results/
│   │   │   └── page.tsx       # Página de resultados
│   │   ├── globals.css        # Estilos globales
│   │   ├── layout.tsx         # Layout principal
│   │   └── page.tsx           # Página principal (formulario)
│   ├── components/
│   │   ├── forms/
│   │   │   └── FunnelRequestForm.tsx
│   │   ├── funnel/            # Componentes de visualización
│   │   │   ├── BudgetCard.tsx
│   │   │   ├── DiagnosisCard.tsx
│   │   │   ├── FunnelStagesCard.tsx
│   │   │   └── TechStackCard.tsx
│   │   └── ui/                # Componentes UI base (shadcn)
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── select.tsx
│   │       └── textarea.tsx
│   ├── data/
│   │   └── knowledge-base.ts  # Base de conocimientos experta
│   ├── lib/
│   │   ├── openai.ts          # Integración con OpenAI
│   │   └── utils.ts           # Utilidades
│   └── types/
│       └── funnel.ts          # TypeScript types
├── .env.example               # Ejemplo de variables de entorno
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 🧠 Base de Conocimientos

La aplicación incluye una base de conocimientos experta con:

- **Lead Magnets**: 7 errores críticos y mejores prácticas (LeadMadness EP.23)
- **Automatizaciones**: 8 automatizaciones clave para aumentar ventas (LeadMadness EP.22)
- **Webinars**: 5 hacks para webinars que venden (LeadMadness EP.21)
- **B2B Prospecting**: Stack completo de herramientas B2B
- **Loop Marketing**: Framework de HubSpot 2025
- **Value Ladder**: Metodología de Alex Hormozi
- **Copywriting**: Frameworks PAS, AIDA, Before-After-Bridge, etc.

Esta base se utiliza mediante RAG (Retrieval Augmented Generation) para personalizar las recomendaciones según el contexto del cliente.

## 🚀 Deployment

### Vercel (Recomendado)

1. Haz push de tu código a GitHub
2. Importa el proyecto en [Vercel](https://vercel.com)
3. Configura las variables de entorno (OPENAI_API_KEY, etc.)
4. Deploy automático

### Otras plataformas

La aplicación es compatible con cualquier plataforma que soporte Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

## 🔐 Seguridad

- **API Keys**: Nunca expongas tus API keys en el código. Usa siempre variables de entorno.
- **Rate Limiting**: Considera implementar rate limiting para el endpoint de generación.
- **Validación**: Todos los inputs están validados con Zod.
- **CORS**: Configurado para dominios específicos en producción.

## 🎯 Roadmap / Mejoras Futuras

- [ ] **Autenticación**: NextAuth.js para usuarios registrados
- [ ] **Persistencia**: Guardar estrategias en PostgreSQL
- [ ] **PDF Export**: Exportar estrategia como PDF profesional
- [ ] **Email**: Enviar estrategia por email (Resend)
- [ ] **Vector DB**: Implementar Pinecone/Supabase para RAG avanzado
- [ ] **A/B Testing**: Generar múltiples variantes de estrategia
- [ ] **Análisis Competitivo**: Integrar web scraping para analizar competencia
- [ ] **Templates Editables**: Editar y personalizar la estrategia generada
- [ ] **Multi-idioma**: Soporte para inglés y otros idiomas
- [ ] **Analytics**: Track de métricas de uso
- [ ] **Pagos**: Monetización con tiers freemium/pro

## 🤝 Contribuciones

Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más información.

## 🙏 Agradecimientos

- OpenAI por GPT-4
- HubSpot por el framework de Loop Marketing
- Alex Hormozi por las metodologías de Value Ladder
- LeadMadness Show por las estrategias de funnels
- shadcn por los componentes UI

## 📞 Soporte

¿Necesitas ayuda?
- 📧 Email: support@funnel-ia.com
- 💬 Discord: [Únete a nuestra comunidad](#)
- 📚 Docs: [Documentación completa](#)

---

**Hecho con ❤️ usando Next.js, TypeScript y OpenAI**

¿Te gustó el proyecto? Dale una ⭐ en GitHub!
