# 🎨 Silk - Estudio de Colorimetría

Aplicación full-stack para estudio de colorimetría con panel administrativo y landing page.

## 🏗️ Arquitectura

- **Frontend**: React + TypeScript + Vite + TailwindCSS
- **Backend**: Node.js + Express + TypeScript
- **Base de datos**: PostgreSQL + Prisma ORM
- **Almacenamiento**: Supabase Storage
- **Autenticación**: Supabase Auth

## 🚀 Quick Start

### Prerrequisitos
- Node.js 18+
- PostgreSQL 14+
- Cuenta de Supabase

### Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd silk
```

2. **Instalar dependencias**
```bash
# Backend
cd api
npm install

# Frontend
cd ../client
npm install
```

3. **Configurar variables de entorno**

**API (.env en /api):**
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/silk_db"
DIRECT_URL="postgresql://user:password@localhost:5432/silk_db"

# Supabase
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
SUPABASE_BUCKET="public"

# Server
PORT=3031
NODE_ENV=production
```

**Cliente (.env en /client):**
```env
# Supabase
VITE_SUPABASE_URL="https://your-project.supabase.co"
VITE_SUPABASE_ANON_KEY="your-anon-key"
VITE_SUPABASE_BUCKET="public"

# API Base URL
VITE_API_BASE_URL="https://your-api-domain.com/api"
```

4. **Configurar base de datos**
```bash
cd api
npx prisma migrate deploy
npx prisma generate
```

5. **Ejecutar en desarrollo**
```bash
# Terminal 1 - API
cd api
npm run dev

# Terminal 2 - Cliente
cd client
npm run dev
```

## 📦 Build para Producción

### Backend
```bash
cd api
npm run build
npm start
```

### Frontend
```bash
cd client
npm run build
```

## 🌐 Deployment

### Variables de entorno críticas:

**API:**
- `DATABASE_URL`: Conexión a PostgreSQL
- `DIRECT_URL`: Conexión directa a PostgreSQL 
- `SUPABASE_URL`: URL de tu proyecto Supabase
- `SUPABASE_SERVICE_ROLE_KEY`: Clave de servicio de Supabase
- `SUPABASE_BUCKET`: Nombre del bucket (default: "public")
- `PORT`: Puerto del servidor (default: 3031)
- `NODE_ENV`: Entorno ("production")

**Cliente:**
- `VITE_SUPABASE_URL`: URL de tu proyecto Supabase
- `VITE_SUPABASE_ANON_KEY`: Clave anónima de Supabase
- `VITE_SUPABASE_BUCKET`: Nombre del bucket
- `VITE_API_BASE_URL`: URL base de tu API

### Comandos útiles

```bash
# Prisma
npx prisma studio          # Interfaz visual de DB
npx prisma migrate dev     # Crear nueva migración
npx prisma migrate deploy  # Aplicar migraciones en prod
npx prisma generate        # Regenerar cliente

# Desarrollo
npm run dev                # Modo desarrollo
npm run build              # Build para producción
npm run preview            # Preview del build
```

## 📂 Estructura del Proyecto

```
silk/
├── api/                   # Backend Express + TypeScript
│   ├── src/
│   │   ├── routes/        # Rutas de la API
│   │   ├── models/        # Esquemas Zod
│   │   ├── prisma/        # Configuración Prisma
│   │   ├── lib/           # Configuraciones (Supabase)
│   │   ├── utils/         # Utilidades
│   │   └── app.ts         # Entrada de la aplicación
│   └── package.json
│
├── client/                # Frontend React + TypeScript
│   ├── src/
│   │   ├── pages/         # Páginas y componentes
│   │   ├── hooks/         # Hooks personalizados
│   │   ├── services/      # Servicios API
│   │   ├── stores/        # Estado global (Zustand)
│   │   ├── shared/        # Componentes compartidos
│   │   └── lib/           # Configuraciones
│   └── package.json
│
└── README.md              # Este archivo
```

## 🔧 Scripts disponibles

### Backend (/api)
- `npm run dev` - Desarrollo con hot-reload
- `npm run build` - Build para producción
- `npm start` - Ejecutar versión compilada
- `npm run prisma:dev` - Migración en desarrollo
- `npm run prisma:studio` - Abrir Prisma Studio

### Frontend (/client)
- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build para producción
- `npm run preview` - Preview del build
- `npm run lint` - Ejecutar ESLint

## 🐛 Troubleshooting

### Problemas comunes:
1. **Error de conexión a DB**: Verificar `DATABASE_URL`
2. **Imágenes no cargan**: Verificar configuración de Supabase Storage
3. **CORS errors**: Verificar configuración de dominio permitido
4. **Build falla**: Verificar todas las variables de entorno

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto es privado y propietario de Estudio Silk.