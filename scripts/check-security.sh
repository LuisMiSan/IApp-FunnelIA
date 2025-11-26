#!/bin/bash

# =================================================================
# Script de Verificación de Seguridad
# Ejecuta este script antes de hacer commit para verificar que
# no haya datos sensibles en el código
# =================================================================

echo "🔐 Verificando seguridad del repositorio..."
echo ""

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0

# 1. Verificar que .env.local no está en staging
echo "📋 Verificando archivos .env..."
if git diff --cached --name-only | grep -q "\.env\.local"; then
    echo -e "${RED}❌ ERROR: .env.local está en staging!${NC}"
    echo "   Ejecuta: git reset HEAD .env.local"
    ERRORS=$((ERRORS + 1))
else
    echo -e "${GREEN}✅ .env.local no está en staging${NC}"
fi

# 2. Buscar API keys de OpenAI en archivos staged
echo ""
echo "🔑 Buscando API keys de OpenAI..."
if git diff --cached | grep -q "sk-proj-[a-zA-Z0-9]\{20,\}"; then
    echo -e "${RED}❌ ERROR: Se detectó una API key de OpenAI en los cambios!${NC}"
    echo "   Revisa los archivos y elimina la clave antes de commitear"
    ERRORS=$((ERRORS + 1))
else
    echo -e "${GREEN}✅ No se detectaron API keys de OpenAI${NC}"
fi

# 3. Buscar API keys de Anthropic en archivos staged
echo ""
echo "🔑 Buscando API keys de Anthropic..."
if git diff --cached | grep -q "sk-ant-[a-zA-Z0-9]\{20,\}"; then
    echo -e "${RED}❌ ERROR: Se detectó una API key de Anthropic en los cambios!${NC}"
    echo "   Revisa los archivos y elimina la clave antes de commitear"
    ERRORS=$((ERRORS + 1))
else
    echo -e "${GREEN}✅ No se detectaron API keys de Anthropic${NC}"
fi

# 4. Verificar que .env.local está en .gitignore
echo ""
echo "📝 Verificando .gitignore..."
if git check-ignore .env.local > /dev/null 2>&1; then
    echo -e "${GREEN}✅ .env.local está en .gitignore${NC}"
else
    echo -e "${RED}❌ ERROR: .env.local NO está en .gitignore!${NC}"
    ERRORS=$((ERRORS + 1))
fi

# 5. Buscar posibles secretos en código
echo ""
echo "🔍 Buscando patrones de secretos..."
PATTERNS=(
    "password\s*=\s*['\"][^'\"]{8,}"
    "secret\s*=\s*['\"][^'\"]{8,}"
    "api[_-]?key\s*=\s*['\"][^'\"]{8,}"
    "token\s*=\s*['\"][^'\"]{20,}"
)

for pattern in "${PATTERNS[@]}"; do
    if git diff --cached | grep -iE "$pattern" > /dev/null; then
        echo -e "${YELLOW}⚠️  ADVERTENCIA: Posible secreto detectado con patrón: $pattern${NC}"
        echo "   Verifica manualmente que no sea un secreto real"
    fi
done

# 6. Verificar que existe .env.example actualizado
echo ""
echo "📄 Verificando .env.example..."
if [ -f ".env.example" ]; then
    if grep -q "XXXXXX" .env.example; then
        echo -e "${GREEN}✅ .env.example existe y contiene placeholders${NC}"
    else
        echo -e "${YELLOW}⚠️  ADVERTENCIA: .env.example puede no tener placeholders${NC}"
    fi
else
    echo -e "${RED}❌ ERROR: .env.example no existe!${NC}"
    ERRORS=$((ERRORS + 1))
fi

# Resultado final
echo ""
echo "=================================="
if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✅ Verificación completada sin errores${NC}"
    echo "   Es seguro hacer commit"
    exit 0
else
    echo -e "${RED}❌ Se encontraron $ERRORS error(es)${NC}"
    echo "   Corrige los errores antes de commitear"
    exit 1
fi
