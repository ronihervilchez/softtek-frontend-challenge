# Softtek Frontend Challenge

Una aplicación web moderna desarrollada con Next.js 15 que permite la gestión y visualización de personajes de Star Wars con funcionalidades de autenticación, fusión de personajes y consulta de historial.

## 🚀 Características

- **Autenticación segura** con AWS Cognito
- **Gestión de personajes** de Star Wars
- **Fusión de personajes** con algoritmos personalizados
- **Historial de consultas** con paginación
- **Interfaz moderna** con Tailwind CSS y shadcn/ui
- **Encriptación de datos** en localStorage
- **Responsive design** para móviles y desktop

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 15 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Componentes UI**: shadcn/ui
- **Estado**: Redux Toolkit
- **Autenticación**: AWS Cognito
- **Backend**: AWS Lambda + API Gateway
- **Base de datos**: DynamoDB
- **Despliegue**: AWS Amplify
- **Package Manager**: pnpm/npm

## 📁 Estructura del Proyecto

```
softtek-frontend-challenge/
├── 📄 amplify.yml                  # Configuración de AWS Amplify
├── 📄 package.json                 # Dependencias y scripts
├── 📄 next.config.mjs              # Configuración de Next.js
├── 📄 tailwind.config.ts           # Configuración de Tailwind CSS
├── 📄 tsconfig.json                # Configuración de TypeScript
├── 📄 components.json              # Configuración de shadcn/ui
├── 📄 postcss.config.mjs           # Configuración de PostCSS
├── 📄 .env.local                   # Variables de entorno (local)
│
├── 📂 app/                         # App Router de Next.js 15
│   ├── 📄 globals.css              # Estilos globales
│   ├── 📄 layout.tsx               # Layout principal
│   ├── 📄 not-found.tsx            # Página 404
│   │
│   ├── 📂 (autenticado)/           # Rutas protegidas
│   │   ├── 📄 layout.tsx           # Layout para rutas autenticadas
│   │   ├── 📄 page.tsx             # Dashboard principal
│   │   ├── 📂 personajes/          # Gestión de personajes
│   │   │   └── 📄 page.tsx         # Galería de personajes
│   │   ├── 📂 historial/           # Historial de consultas
│   │   │   ├── 📄 page.tsx         # Lista de historial
│   │   │   └── 📂 detalle/
│   │   │       └── 📄 page.tsx     # Detalle de consulta
│   │   └── 📂 perfil/              # Gestión de perfil
│   │       └── 📄 page.tsx         # Perfil de usuario
│   │
│   ├── 📂 api/                     # API Routes
│   │   ├── 📂 historial/
│   │   │   └── 📄 route.ts         # API de historial (POST)
│   │   ├── 📂 login/
│   │   │   └── 📄 route.ts         # API de login
│   │   ├── 📂 personajes/
│   │   │   └── 📄 route.ts         # API de personajes (GET/POST)
│   │   └── 📂 signin/
│   │       └── 📄 route.ts         # API de registro
│   │
│   ├── 📂 auth/                    # Autenticación
│   │   ├── 📄 layout.tsx           # Layout de auth
│   │   ├── 📂 login/
│   │   │   └── 📄 page.tsx         # Página de login
│   │   └── 📂 signup/
│   │       └── 📄 page.tsx         # Página de registro
│   │
│   └── 📂 redux/                   # Estado global
│       ├── 📄 store.ts             # Configuración de Redux
│       └── 📂 reducers/
│           └── 📄 personas-slice.ts # Slice de personajes
│
├── 📂 components/                  # Componentes reutilizables
│   ├── 📄 login-form.tsx           # Formulario de login
│   ├── 📄 main-layout.tsx          # Layout principal
│   ├── 📄 people-list.tsx          # Lista de personajes
│   ├── 📄 profile-section.tsx      # Sección de perfil
│   ├── 📄 singup-form.tsx          # Formulario de registro
│   ├── 📄 theme-provider.tsx       # Proveedor de tema
│   ├── 📄 theme-toggle.tsx         # Botón de tema
│   └── 📂 ui/                      # Componentes UI de shadcn
│       ├── 📄 button.tsx           # Componente Button
│       ├── 📄 input.tsx            # Componente Input
│       ├── 📄 card.tsx             # Componente Card
│       ├── 📄 badge.tsx            # Componente Badge
│       ├── 📄 dialog.tsx           # Componente Dialog
│       ├── 📄 toast.tsx            # Componente Toast
│       └── ... (30+ componentes)
│
├── 📂 hooks/                       # Custom Hooks
│   ├── 📄 use-mobile.tsx           # Hook para detectar móviles
│   └── 📄 use-toast.ts             # Hook para toasts
│
├── 📂 interfaces/                  # Tipos de TypeScript
│   ├── 📄 api-response.interface.ts # Respuestas de API
│   ├── 📄 history.interface.ts     # Historial
│   ├── 📄 login.interface.ts       # Login
│   ├── 📄 person.interface.ts      # Personajes
│   └── 📄 signin.interface.ts      # Registro
│
├── 📂 lib/                         # Utilidades y configuración
│   ├── 📄 config.ts                # Configuración de la app
│   └── 📄 utils.ts                 # Funciones utilitarias
│
├── 📂 mocks/                       # Datos de prueba
│   ├── 📄 fusionados-mock.json     # Mock de personajes
│   └── 📄 historial-mock.json      # Mock de historial
│
├── 📂 public/                      # Archivos estáticos
│   ├── 📄 placeholder-logo.png     # Logo placeholder
│   ├── 📄 placeholder-user.jpg     # Avatar placeholder
│   └── 📄 placeholder.svg          # Imagen placeholder
│
└── 📂 styles/                      # Estilos adicionales
    └── 📄 globals.css              # Estilos globales adicionales
```

## 🔧 Configuración y Desarrollo

### Prerrequisitos

- Node.js 18+ 
- pnpm (recomendado) o npm
- Cuenta de AWS con Cognito configurado

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd softtek-frontend-challenge

# Instalar dependencias
pnpm install
# o
npm install

# Configurar variables de entorno
cp .env.example .env.local
```

### Variables de Entorno

```bash
# .env.local
BACKEND_API=https://your-api-gateway-url.amazonaws.com/prod
ENCRYPTED_KEY=your-encryption-key-uuid
```

### Scripts Disponibles

```bash
# Desarrollo
pnpm dev          # Iniciar servidor de desarrollo
pnpm build        # Construir para producción
pnpm start        # Iniciar servidor de producción
pnpm lint         # Ejecutar linter

# Alternativas con npm
npm run dev
npm run build
npm start
npm run lint
```

## 🌐 Despliegue

### AWS Amplify

El proyecto está configurado para desplegarse automáticamente en AWS Amplify:

1. **Conectar repositorio** a AWS Amplify
2. **Configurar variables de entorno** en Amplify Console
3. **El archivo [`amplify.yml`](amplify.yml )** maneja la configuración de build

### Variables de Entorno en Amplify

```bash
NEXT_PUBLIC_BACKEND_API=https://your-api-gateway.amazonaws.com/prod
NEXT_PUBLIC_CRYPTO_SECRET_KEY=your-encryption-key
NODE_ENV=production
```

## 🏗️ Arquitectura

### Frontend (Next.js)
- **App Router**: Estructura de carpetas basada en rutas
- **API Routes**: Middleware para comunicación con backend
- **Server Components**: Renderizado del lado del servidor
- **Client Components**: Interactividad del lado del cliente

### Backend (AWS)
- **API Gateway**: Punto de entrada para APIs
- **Lambda Functions**: Lógica de negocio
- **Cognito**: Autenticación y autorización
- **DynamoDB**: Base de datos NoSQL

### Seguridad
- **JWT Tokens**: Autenticación basada en tokens
- **Encriptación**: Datos sensibles encriptados en localStorage
- **CORS**: Configuración adecuada para múltiples dominios
- **Lambda Authorizer**: Validación de tokens en el backend

## 📱 Funcionalidades Principales

### 🔐 Autenticación
- Login/Registro con AWS Cognito
- Gestión segura de tokens JWT
- Redirección automática en rutas protegidas
- Encriptación de datos en cliente

### 👥 Gestión de Personajes
- Galería visual de personajes de Star Wars
- Fusión de personajes con algoritmos personalizados
- Visualización detallada de características
- Imágenes placeholder para casos sin imagen

### 📊 Historial
- Consulta de historial de fusiones
- Paginación con DynamoDB
- Navegación entre páginas
- Detalles de cada consulta realizada

### 🎨 Interfaz de Usuario
- Diseño responsive para todos los dispositivos
- Tema claro/oscuro
- Componentes reutilizables con shadcn/ui
- Animaciones y transiciones suaves
- Estados de carga y error

## 🧪 Testing

```bash
# Ejecutar tests (cuando estén configurados)
pnpm test
npm test
```

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit los cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles.

## 👨‍💻 Autor

**Tu Nombre**
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- Email: tu-email@ejemplo.com

## 🙏 Agradecimientos

- [Star Wars API](https://swapi.dev/) para los datos de personajes
- [shadcn/ui](https://ui.shadcn.com/) por los componentes UI
- [Tailwind CSS](https://tailwindcss.com/) por el sistema de estilos
- [Next.js](https://nextjs.org/) por el framework web
