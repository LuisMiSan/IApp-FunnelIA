# 🔐 Política de Seguridad

## Datos Sensibles y API Keys

### ⚠️ NUNCA Commitear Datos Sensibles

Este proyecto utiliza API keys y datos sensibles que **NUNCA** deben ser incluidos en el repositorio de Git.

### 📋 Lista de Archivos con Datos Sensibles

Los siguientes archivos contienen o pueden contener información sensible y están **protegidos por `.gitignore`**:

```
.env.local          # Variables de entorno locales (PRINCIPAL)
.env                # Variables de entorno
.env.development    # Variables para desarrollo
.env.production     # Variables para producción
.env.test           # Variables para testing
*.key               # Archivos de claves
*.pem               # Certificados
secrets.json        # Archivos de secretos
```

### ✅ Configuración Segura

1. **Archivo `.env.example`**: Contiene solo placeholders, es seguro commitear
2. **Archivo `.env.local`**: Contiene tus claves reales, **NUNCA** se commitea
3. **Archivo `.gitignore`**: Protege todos los archivos sensibles

### 🔑 API Keys Utilizadas

Este proyecto requiere las siguientes API keys:

- **OpenAI API Key** (REQUERIDO): Para generación de estrategias con GPT-4
- **Anthropic API Key** (OPCIONAL): Para análisis adicionales con Claude
- **Database URL** (OPCIONAL): Para persistencia de datos en PostgreSQL

### 📝 Cómo Configurar de Forma Segura

1. **Copia el archivo de ejemplo**:
   ```bash
   cp .env.example .env.local
   ```

2. **Edita `.env.local` con tus claves reales**:
   ```env
   OPENAI_API_KEY=sk-proj-tu-clave-real-aqui
   ```

3. **Verifica que no se commitee**:
   ```bash
   git status
   # .env.local NO debe aparecer en la lista
   ```

### 🚨 Si Expones una API Key Accidentalmente

Si accidentalmente commiteas o expones una API key:

1. **Inmediatamente revoca la clave** en el dashboard del proveedor:
   - OpenAI: https://platform.openai.com/api-keys
   - Anthropic: https://console.anthropic.com/settings/keys

2. **Genera una nueva clave** y actualiza `.env.local`

3. **Si la clave está en Git**, elimínala del historial:
   ```bash
   # PRECAUCIÓN: Esto reescribe el historial
   git filter-branch --force --index-filter \
   "git rm --cached --ignore-unmatch .env.local" \
   --prune-empty --tag-name-filter cat -- --all
   ```

4. **Force push** (solo si trabajas solo o coordinado con el equipo):
   ```bash
   git push origin --force --all
   ```

### 🛡️ Mejores Prácticas de Seguridad

#### DO ✅

- ✅ Usar `.env.local` para variables de entorno locales
- ✅ Mantener `.env.example` actualizado con placeholders
- ✅ Configurar límites de uso en OpenAI dashboard
- ✅ Monitorear uso de API regularmente
- ✅ Rotar API keys periódicamente (cada 90 días)
- ✅ Usar diferentes keys para desarrollo y producción
- ✅ Configurar alertas de gasto en OpenAI
- ✅ Revisar `.gitignore` antes de cada commit

#### DON'T ❌

- ❌ Commitear archivos `.env` al repositorio
- ❌ Compartir API keys en chat, email o Slack
- ❌ Hardcodear claves en el código fuente
- ❌ Usar claves de producción en desarrollo
- ❌ Subir claves a servicios de paste (Pastebin, etc.)
- ❌ Incluir claves en screenshots o videos
- ❌ Almacenar claves en navegador o notas sin cifrar

### 🔍 Verificación de Seguridad

Antes de hacer push, ejecuta:

```bash
# Verificar que no hay claves en staging
git diff --cached | grep -i "sk-proj-\|sk-ant-"

# Verificar que .env.local está ignorado
git check-ignore .env.local
# Debe retornar: .env.local

# Buscar posibles claves en el código
grep -r "sk-proj-" src/ || echo "✅ No se encontraron claves"
```

### 📊 Monitoreo de Uso de API

Para evitar cargos inesperados:

1. **OpenAI Dashboard**: https://platform.openai.com/usage
   - Configura límites mensuales
   - Activa alertas de gasto
   - Revisa uso diario

2. **Variables de entorno en producción**:
   - Usa secretos de Vercel/Netlify/Railway
   - No uses el mismo `.env.local` que en desarrollo

### 🔐 Seguridad en Producción

Para deploys en producción (Vercel, Railway, etc.):

1. **Usa el panel de environment variables** de la plataforma
2. **Nunca** incluyas `.env.production` en el repo
3. **Configura secrets** específicos para cada ambiente
4. **Habilita rate limiting** en la API
5. **Usa HTTPS** siempre
6. **Implementa autenticación** para endpoints sensibles

### 📞 Reporte de Vulnerabilidades

Si encuentras una vulnerabilidad de seguridad:

1. **NO** abras un issue público
2. Envía un email a: security@funnel-ia.com (reemplazar con email real)
3. Incluye descripción detallada y pasos para reproducir
4. Esperamos responder en 48 horas

### 🔄 Rotación de Claves

Calendario recomendado:

- **Desarrollo**: Cada 90 días o al detectar exposición
- **Producción**: Cada 60 días
- **Post-incidente**: Inmediatamente

### 📚 Recursos Adicionales

- [OpenAI API Best Practices](https://platform.openai.com/docs/guides/production-best-practices)
- [OWASP API Security](https://owasp.org/www-project-api-security/)
- [Git Secrets Prevention](https://github.com/awslabs/git-secrets)

---

**Última actualización**: 2025-11-26
**Versión**: 1.0

⚠️ **Recuerda**: La seguridad es responsabilidad de todos. Si tienes dudas, pregunta antes de commitear.
