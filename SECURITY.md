# 🔒 Guía de Seguridad - FunnelIA

Este documento detalla todas las medidas de seguridad implementadas en el proyecto y las mejores prácticas que debes seguir.

## 📋 Tabla de Contenidos

1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [Variables de Entorno](#variables-de-entorno)
3. [Protección de Datos Sensibles](#protección-de-datos-sensibles)
4. [Configuración de GitHub](#configuración-de-github)
5. [Mejores Prácticas](#mejores-prácticas)
6. [Checklist de Seguridad](#checklist-de-seguridad)
7. [Qué Hacer en Caso de Exposición](#qué-hacer-en-caso-de-exposición)

---

## 🎯 Resumen Ejecutivo

**FunnelIA** implementa múltiples capas de seguridad para proteger datos sensibles:

- ✅ **Variables de entorno**: Todas las credenciales y API keys están en archivos `.env` (no versionados)
- ✅ **Validación estricta**: El código valida que las variables críticas estén configuradas antes de ejecutarse
- ✅ **sessionStorage**: Los datos del cliente se almacenan en `sessionStorage` en lugar de `localStorage`, eliminándose automáticamente al cerrar el navegador
- ✅ **.gitignore robusto**: Excluye todos los archivos sensibles del control de versiones
- ✅ **Sin hardcoding**: Ninguna credencial está codificada directamente en el código fuente

---

## 🔑 Variables de Entorno

### Configuración Inicial

1. **Copia el archivo de ejemplo**:
   ```bash
   cp .env.example .env
   ```

2. **Edita el archivo `.env` con tus credenciales reales**:
   ```bash
   nano .env  # o usa tu editor preferido
   ```

3. **NUNCA compartas el archivo `.env`** con nadie ni lo subas a GitHub

### Variables Críticas

#### OPENAI_API_KEY (REQUERIDA)
```env
OPENAI_API_KEY="sk-proj-tu-api-key-real"
```
- **Obtención**: https://platform.openai.com/api-keys
- **Criticidad**: ALTA - El proyecto no funciona sin esta clave
- **Costo**: Esta clave tiene acceso a tu cuenta de OpenAI y puede generar cargos

#### DATABASE_URL (REQUERIDA)
```env
DATABASE_URL="postgresql://usuario:contraseña@host:puerto/database"
```
- **Criticidad**: ALTA - Contiene credenciales de base de datos
- **Recomendación**: Usa contraseñas seguras (mínimo 20 caracteres, alfanuméricos + símbolos)

#### NEXTAUTH_SECRET (REQUERIDA EN PRODUCCIÓN)
```env
NEXTAUTH_SECRET="genera-uno-con-openssl-rand-base64-32"
```
- **Generación**: `openssl rand -base64 32`
- **Criticidad**: ALTA - Protege las sesiones de usuario
- **NUNCA uses el valor por defecto** en producción

#### Variables Opcionales
- `ANTHROPIC_API_KEY`: Para usar Claude como alternativa a GPT
- `PINECONE_API_KEY`: Para búsqueda semántica avanzada
- `RESEND_API_KEY`: Para envío de emails

### Validación de Variables

El código valida automáticamente las variables críticas:

```typescript
// src/lib/openai.ts
if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY no está configurada...');
}
```

Si falta una variable requerida, la aplicación **no arrancará** y mostrará un error claro.

---

## 🛡️ Protección de Datos Sensibles

### 1. Almacenamiento en el Cliente

#### ❌ ANTES (Inseguro)
```typescript
// Datos persistían indefinidamente
localStorage.setItem("funnelStrategy", JSON.stringify(data));
```

**Problemas**:
- Los datos permanecen incluso después de cerrar el navegador
- Accesibles desde cualquier script
- Visibles en DevTools
- Sin encriptación

#### ✅ AHORA (Seguro)
```typescript
// Se eliminan automáticamente al cerrar el navegador
sessionStorage.setItem("funnelStrategy", JSON.stringify(data));
```

**Beneficios**:
- Datos se borran al cerrar el navegador
- Menor riesgo de exposición prolongada
- Protección contra acceso no autorizado

### 2. Archivos Excluidos de Git

El archivo `.gitignore` está configurado para excluir:

```gitignore
# Variables de entorno
.env
.env*.local
.env.development
.env.production
.env.test

# Archivos de seguridad
*.key
*.pem
*.cert
*.p12
.secrets/
credentials.json
service-account.json

# Logs sensibles
logs/
*.log

# Backups de base de datos
*.sql
*.dump
*.backup
```

### 3. Validación en API Routes

```typescript
// src/app/api/generate-funnel/route.ts
if (!process.env.OPENAI_API_KEY) {
  return NextResponse.json(
    { success: false, error: "API key no configurada" },
    { status: 500 }
  );
}
```

---

## 🔐 Configuración de GitHub

### Protección del Repositorio

1. **Nunca subas archivos `.env`**:
   ```bash
   # Verifica antes de hacer commit
   git status

   # Si aparece .env, significa que tu .gitignore está mal configurado
   ```

2. **Revisa antes de hacer commit**:
   ```bash
   git diff --cached
   ```

   Busca patrones sospechosos:
   - `sk-` (API keys de OpenAI/Anthropic)
   - `password`, `secret`, `token`
   - URLs de conexión con credenciales

3. **Usa GitHub Secrets para CI/CD**:
   - Ve a: Repositorio → Settings → Secrets and variables → Actions
   - Agrega variables necesarias para despliegues automáticos

### Configuración de Vercel/Netlify (Producción)

1. **No agregues variables de entorno en el código**
2. **Usa el dashboard del proveedor**:
   - Vercel: Project Settings → Environment Variables
   - Netlify: Site Settings → Build & Deploy → Environment

3. **Separa entornos**:
   - Development: Variables para desarrollo
   - Preview: Variables para PRs
   - Production: Variables únicas y seguras para producción

---

## ✅ Mejores Prácticas

### 1. Rotación de Credenciales

**Frecuencia recomendada**:
- API Keys: Cada 90 días
- Database passwords: Cada 6 meses
- NEXTAUTH_SECRET: Cada año o después de incidentes

**Proceso**:
```bash
# 1. Genera nueva API key en OpenAI
# 2. Actualiza .env local
OPENAI_API_KEY="nueva-clave"

# 3. Actualiza en producción (Vercel/Netlify)
# 4. Revoca la clave antigua en OpenAI dashboard
```

### 2. Monitoreo de Uso

**Revisa regularmente**:
- Dashboard de OpenAI: https://platform.openai.com/usage
- Costos inesperados pueden indicar uso no autorizado

### 3. Principio de Mínimo Privilegio

- Usa API keys con permisos mínimos necesarios
- Crea keys específicas por entorno (dev, staging, prod)
- Nunca uses tu API key personal en producción compartida

### 4. Auditoría de Código

**Antes de cada commit**:
```bash
# Busca posibles secretos expuestos
grep -r "sk-" . --exclude-dir={node_modules,.git,.next}
grep -r "password" . --exclude-dir={node_modules,.git,.next}
```

### 5. Copias de Seguridad Seguras

**Para backups de base de datos**:
```bash
# Exporta con pg_dump
pg_dump $DATABASE_URL > backup.sql

# IMPORTANTE: Agrega backup.sql a .gitignore
# NUNCA lo subas a GitHub

# Almacena en ubicación segura y encriptada
gpg -c backup.sql  # Encripta
rm backup.sql      # Elimina el no encriptado
```

---

## 📝 Checklist de Seguridad

### Antes de Iniciar el Proyecto

- [ ] Copié `.env.example` a `.env`
- [ ] Configuré todas las variables requeridas
- [ ] Generé un `NEXTAUTH_SECRET` único con `openssl rand -base64 32`
- [ ] Verifiqué que `.env` está en `.gitignore`

### Antes de Cada Commit

- [ ] Ejecuté `git status` y `.env` NO aparece
- [ ] Ejecuté `git diff --cached` y no veo credenciales
- [ ] Busqué patrones sensibles con grep
- [ ] Revisé que no haya hardcoded secrets

### Antes de Desplegar a Producción

- [ ] Configuré variables de entorno en el proveedor (Vercel/Netlify)
- [ ] Usé credenciales diferentes a las de desarrollo
- [ ] Verifiqué que `NEXTAUTH_URL` apunta al dominio correcto (HTTPS)
- [ ] Generé nuevo `NEXTAUTH_SECRET` para producción
- [ ] Configuré límites de uso en OpenAI dashboard

### Mantenimiento Mensual

- [ ] Revisé el uso de API en OpenAI dashboard
- [ ] Revisé logs en busca de accesos sospechosos
- [ ] Verifiqué que no haya credenciales expuestas en GitHub
- [ ] Actualicé dependencias de seguridad

---

## 🚨 Qué Hacer en Caso de Exposición

### Si Expusiste una API Key en GitHub

**ACTÚA INMEDIATAMENTE**:

1. **Revoca la clave comprometida** (en 60 segundos):
   - OpenAI: https://platform.openai.com/api-keys → Delete
   - Anthropic: https://console.anthropic.com/ → Revoke

2. **Genera una nueva clave**:
   ```bash
   # Actualiza tu .env
   OPENAI_API_KEY="nueva-clave-generada"
   ```

3. **Actualiza en producción**:
   - Vercel/Netlify dashboard → Environment Variables → Update

4. **Limpia el historial de Git** (si la clave está en commits antiguos):
   ```bash
   # PELIGROSO - Solo si sabes lo que haces
   # Considera contactar a GitHub Support para limpiar el caché

   # Alternativa: Hacer el repositorio privado temporalmente
   ```

5. **Revisa cargos inesperados**:
   - OpenAI Usage dashboard
   - Configura alertas de gasto

### Si Expusiste Credenciales de Base de Datos

1. **Cambia la contraseña INMEDIATAMENTE**:
   ```sql
   ALTER USER username WITH PASSWORD 'nueva_contraseña_segura';
   ```

2. **Revisa logs de acceso** en busca de conexiones sospechosas

3. **Considera rotar todas las credenciales** relacionadas

4. **Actualiza el `DATABASE_URL`** en todos los entornos

---

## 🔗 Referencias Adicionales

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning)
- [OpenAI API Best Practices](https://platform.openai.com/docs/guides/safety-best-practices)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

## 📞 Soporte

Si detectas un problema de seguridad:
1. **NO lo publiques en issues públicos**
2. Contacta directamente al propietario del repositorio
3. Proporciona detalles específicos del problema

---

**Última actualización**: 2025-11-17
**Versión**: 1.0.0
**Mantenido por**: Equipo FunnelIA
