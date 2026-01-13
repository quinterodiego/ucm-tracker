# 🎬 UCM Tracker

Aplicación web para seguir tu progreso en el Universo Cinematográfico de Marvel (UCM). Construida con Next.js, TypeScript, NextAuth.js y Google Sheets.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/TU_USUARIO/ucm-tracker)

## ✨ Características

- 📊 Seguimiento de progreso de películas y series del UCM
- 🔐 Autenticación con email/contraseña o Google
- 💾 Guardado de progreso en base de datos
- 🎨 Interfaz moderna y responsive
- 🖼️ Posters de películas y series
- 🔍 Filtros por tipo (películas, series, vistas, no vistas)

## 🚀 Instalación

1. **Instala las dependencias:**
```bash
npm install
```

2. **Configura las variables de entorno:**
Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu-secret-super-seguro-aqui-genera-uno-con-openssl-rand-base64-32

# Google OAuth (opcional - para Google Login)
GOOGLE_CLIENT_ID=tu-google-client-id
GOOGLE_CLIENT_SECRET=tu-google-client-secret
```

**Para generar NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

**Para configurar Google OAuth:**
1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la API de Google+
4. Crea credenciales OAuth 2.0
5. Agrega `http://localhost:3000/api/auth/callback/google` como URI de redirección autorizada
6. Copia el Client ID y Client Secret a tu archivo `.env`

3. **Configura Google Sheets:**
   - Crea una hoja de cálculo en Google Sheets
   - Crea un Service Account en Google Cloud Console
   - Comparte la hoja con el email del Service Account
   - Configura las variables de entorno (ver SETUP.md)

4. **Inicializa las hojas:**
```bash
# Después de iniciar el servidor, visita:
# http://localhost:3000/api/init
# O las hojas se crearán automáticamente
```

4. **Mueve las imágenes a la carpeta public:**
Las imágenes deben estar en `public/imgs/` para que funcionen correctamente.

5. **Inicia el servidor de desarrollo:**
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
ucm-tracker/
├── app/
│   ├── api/              # API routes
│   ├── auth/             # Páginas de autenticación
│   ├── globals.css       # Estilos globales
│   ├── layout.tsx        # Layout principal
│   └── page.tsx          # Página principal
├── components/           # Componentes React
├── data/                 # Datos del UCM
├── lib/                  # Utilidades y configuración
├── prisma/               # Schema de Prisma
└── public/               # Archivos estáticos (imágenes)
```

## 🛠️ Tecnologías

- **Next.js 14** - Framework React
- **TypeScript** - Tipado estático
- **NextAuth.js** - Autenticación
- **Google Sheets API** - Base de datos (Google Sheets)
- **Tailwind CSS** - Estilos

## 📝 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter

## 🔒 Autenticación

La aplicación soporta dos métodos de autenticación:

1. **Email/Contraseña**: Los usuarios pueden registrarse con email y contraseña
2. **Google OAuth**: Los usuarios pueden iniciar sesión con su cuenta de Google

## 💾 Base de Datos

El progreso de cada usuario se guarda en **Google Sheets**. La aplicación usa dos hojas:
- **Users**: Almacena información de usuarios (email, nombre, contraseña hasheada)
- **Watched**: Almacena los items marcados como vistos por cada usuario

Cada usuario tiene su propio conjunto de items marcados como vistos.

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.
