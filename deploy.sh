#!/bin/bash

# Script de deployment para Silk
echo "🚀 Iniciando deployment de Silk..."

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para mostrar errores
error() {
    echo -e "${RED}❌ Error: $1${NC}"
    exit 1
}

# Función para mostrar éxito
success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Función para mostrar advertencias
warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Verificar que estamos en el directorio correcto
if [ ! -f "README.md" ] || [ ! -d "api" ] || [ ! -d "client" ]; then
    error "Ejecute este script desde la raíz del proyecto Silk"
fi

# Verificar variables de entorno API
echo "🔍 Verificando configuración..."

if [ ! -f "api/.env" ]; then
    warning "No se encontró api/.env. Copiando desde .env.example..."
    if [ -f "api/.env.example" ]; then
        cp api/.env.example api/.env
        warning "Por favor, configure las variables en api/.env antes de continuar"
        exit 1
    else
        error "No se encontró api/.env.example"
    fi
fi

if [ ! -f "client/.env" ]; then
    warning "No se encontró client/.env. Copiando desde .env.example..."
    if [ -f "client/.env.example" ]; then
        cp client/.env.example client/.env
        warning "Por favor, configure las variables en client/.env antes de continuar"
        exit 1
    else
        error "No se encontró client/.env.example"
    fi
fi

# Build del backend
echo "🔨 Building API..."
cd api
npm ci --production=false || error "Error instalando dependencias del API"
npm run build || error "Error building API"
success "API build completado"

# Build del frontend
echo "🔨 Building Cliente..."
cd ../client
npm ci --production=false || error "Error instalando dependencias del cliente"
npm run build || error "Error building cliente"
success "Cliente build completado"

# Volver al directorio raíz
cd ..

echo ""
success "🎉 Build completado exitosamente!"
echo ""
echo "📦 Archivos generados:"
echo "  - api/dist/     (Backend compilado)"
echo "  - client/dist/  (Frontend optimizado)"
echo ""
echo "🚀 Siguiente paso: Deploye los archivos a su servidor"
echo "   - Backend: Ejecute 'npm start' en /api"
echo "   - Frontend: Sirva los archivos de /client/dist"
echo ""