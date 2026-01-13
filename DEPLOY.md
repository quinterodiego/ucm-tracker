# 🚀 Guía de Despliegue

Esta guía te ayudará a subir tu proyecto a GitHub y desplegarlo en Vercel.

## 📦 Paso 1: Preparar el repositorio local

### 1.1 Inicializar Git (si no está inicializado)
```bash
git init
```

### 1.2 Agregar todos los archivos
```bash
git add .
```

### 1.3 Hacer el primer commit
```bash
git commit -m "Initial commit: UCM Tracker con Next.js y Google Sheets"
```

## 🐙 Paso 2: Crear repositorio en GitHub

### 2.1 Crear el repositorio
1. Ve a [GitHub](https://github.com)
2. Haz clic en el botón **"+"** en la esquina superior derecha
3. Selecciona **"New repository"**
4. Completa el formulario:
   - **Repository name**: `ucm-tracker` (o el nombre que prefieras)
   - **Description**: "Tracker del Universo Cinematográfico de Marvel"
   - **Visibility**: Elige **Public** o **Private**
   - ⚠️ **NO marques** "Initialize this repository with a README" (ya tenemos uno)
5. Haz clic en **"Create repository"**

### 2.2 Conectar el repositorio local con GitHub
GitHub te mostrará comandos. Ejecuta estos (reemplaza `TU_USUARIO` con tu usuario de GitHub):

```bash
git remote add origin https://github.com/TU_USUARIO/ucm-tracker.git
git branch -M main
git push -u origin main
```

## ☁️ Paso 3: Desplegar en Vercel

Vercel es la mejor opción para Next.js porque:
- ✅ Despliegue automático desde GitHub
- ✅ SSL gratuito
- ✅ CDN global
- ✅ Variables de entorno fáciles de configurar
- ✅ Gratis para proyectos personales

### 3.1 Crear cuenta en Vercel
1. Ve a [Vercel](https://vercel.com)
2. Haz clic en **"Sign Up"**
3. Selecciona **"Continue with GitHub"** (recomendado)
4. Autoriza Vercel para acceder a tus repositorios

### 3.2 Importar el proyecto
1. En el dashboard de Vercel, haz clic en **"Add New..."** > **"Project"**
2. Selecciona tu repositorio `ucm-tracker`
3. Haz clic en **"Import"**

### 3.3 Configurar el proyecto
Vercel detectará automáticamente que es un proyecto Next.js. Solo necesitas:

1. **Framework Preset**: Debería detectar "Next.js" automáticamente
2. **Root Directory**: Deja en blanco (o `./` si está en la raíz)
3. **Build Command**: `npm run build` (debería estar automático)
4. **Output Directory**: `.next` (debería estar automático)
5. Haz clic en **"Deploy"**

### 3.4 Configurar variables de entorno
**IMPORTANTE**: Antes de que el despliegue funcione, necesitas configurar las variables de entorno.

1. En la página del proyecto en Vercel, ve a **"Settings"** > **"Environment Variables"**
2. Agrega las siguientes variables:

```env
# Google Sheets
GOOGLE_SHEET_ID=tu-sheet-id
GOOGLE_SERVICE_ACCOUNT_EMAIL=tu-service-account@...
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_PROJECT_ID=tu-project-id

# NextAuth
NEXTAUTH_URL=https://tu-proyecto.vercel.app
NEXTAUTH_SECRET=tu-secret-generado

# Google OAuth (opcional)
GOOGLE_CLIENT_ID=tu-google-client-id
GOOGLE_CLIENT_SECRET=tu-google-client-secret
```

**Notas importantes:**
- `NEXTAUTH_URL` debe ser la URL de tu proyecto en Vercel (ej: `https://ucm-tracker.vercel.app`)
- Para `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`, copia todo el contenido incluyendo los `\n`
- Marca todas las variables para **Production**, **Preview**, y **Development**

3. Después de agregar las variables, ve a **"Deployments"** y haz clic en los tres puntos del último deployment > **"Redeploy"**

### 3.5 Actualizar Google OAuth Redirect URI
1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Ve a **"APIs & Services"** > **"Credentials"**
3. Edita tu OAuth 2.0 Client ID
4. Agrega en **Authorized redirect URIs**:
   ```
   https://tu-proyecto.vercel.app/api/auth/callback/google
   ```
5. Guarda los cambios

## 🔄 Paso 4: Despliegue automático

Una vez configurado, cada vez que hagas `git push` a GitHub:
1. Vercel detectará automáticamente el cambio
2. Creará un nuevo deployment
3. Ejecutará `npm run build`
4. Desplegará la nueva versión

Puedes ver el progreso en el dashboard de Vercel.

## 📝 Paso 5: Actualizar README con badges (opcional)

Puedes agregar badges a tu README.md:

```markdown
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/TU_USUARIO/ucm-tracker)
```

## 🐛 Solución de problemas

### Error: "Module not found"
- Verifica que todas las dependencias estén en `package.json`
- Asegúrate de que `npm install` se ejecute correctamente

### Error: "Environment variable not found"
- Verifica que todas las variables de entorno estén configuradas en Vercel
- Asegúrate de marcar las variables para el entorno correcto (Production/Preview/Development)

### Error: "NEXTAUTH_URL mismatch"
- Verifica que `NEXTAUTH_URL` en Vercel coincida con la URL de tu proyecto
- Debe ser `https://tu-proyecto.vercel.app` (con https, no http)

### Error: "Google Sheets API error"
- Verifica que el Service Account tenga acceso a la hoja
- Asegúrate de que `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` esté correctamente formateado (con `\n` literales)

## 🎉 ¡Listo!

Una vez completado, tu aplicación estará disponible en:
- **URL de producción**: `https://tu-proyecto.vercel.app`
- **URL personalizada**: Puedes configurar un dominio personalizado en Vercel Settings > Domains

## 📚 Recursos adicionales

- [Documentación de Vercel](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [NextAuth.js Deployment](https://next-auth.js.org/configuration/options#nextauth_url)
