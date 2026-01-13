# 🔐 Configuración de Google OAuth (Login con Google)

Esta guía te explica cómo obtener el `GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET` para que los usuarios puedan iniciar sesión con su cuenta de Google.

## 📋 Requisitos previos

- Tener acceso a [Google Cloud Console](https://console.cloud.google.com/)
- Tener un proyecto creado (puedes usar el mismo proyecto donde creaste el Service Account)

## 🚀 Pasos para crear las credenciales OAuth 2.0

### 1. Acceder a Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Selecciona tu proyecto (el mismo donde creaste el Service Account para Google Sheets)

### 2. Habilitar la API de Google+

1. En el menú lateral, ve a **"APIs & Services"** > **"Library"** (o "Biblioteca")
2. Busca **"Google+ API"** o **"Google Identity Services API"**
3. Haz clic en el resultado
4. Haz clic en **"Enable"** (Habilitar) si no está habilitada

**Nota**: En algunos casos, Google puede recomendar usar "Google Identity Services API" en lugar de Google+ API. Ambas funcionan.

### 3. Configurar la pantalla de consentimiento OAuth

1. Ve a **"APIs & Services"** > **"OAuth consent screen"** (Pantalla de consentimiento OAuth)
2. Selecciona el tipo de usuario:
   - **External** (Externo) - Para usuarios fuera de tu organización
   - **Internal** (Interno) - Solo para usuarios de tu organización (requiere Google Workspace)
   
   Para este proyecto, selecciona **"External"**

3. Completa el formulario:
   - **App name** (Nombre de la app): `UCM Tracker` (o el nombre que prefieras)
   - **User support email** (Email de soporte): Tu email
   - **Developer contact information** (Información de contacto del desarrollador): Tu email
   - Haz clic en **"Save and Continue"** (Guardar y continuar)

4. **Scopes** (Alcances):
   - Por ahora puedes dejarlo en blanco y hacer clic en **"Save and Continue"**
   - O agregar: `email`, `profile`, `openid`

5. **Test users** (Usuarios de prueba):
   - Si tu app está en modo "Testing", agrega los emails de los usuarios que quieres que prueben
   - Si está en "Production", no es necesario
   - Haz clic en **"Save and Continue"**

6. **Summary** (Resumen):
   - Revisa la información
   - Haz clic en **"Back to Dashboard"** (Volver al panel)

### 4. Crear las credenciales OAuth 2.0

1. Ve a **"APIs & Services"** > **"Credentials"** (Credenciales)

2. Haz clic en **"+ CREATE CREDENTIALS"** (Crear credenciales)

3. Selecciona **"OAuth client ID"** (ID de cliente OAuth)

4. Si es la primera vez, te pedirá configurar la pantalla de consentimiento (ya lo hiciste en el paso 3)

5. Selecciona el tipo de aplicación:
   - **Application type**: **"Web application"** (Aplicación web)

6. Completa el formulario:
   - **Name** (Nombre): `UCM Tracker Web Client` (o el nombre que prefieras)
   
   - **Authorized JavaScript origins** (Orígenes JavaScript autorizados):
     ```
     http://localhost:3000
     ```
     (Para producción, agrega también tu dominio, ej: `https://tudominio.com`)
   
   - **Authorized redirect URIs** (URIs de redirección autorizadas):
     ```
     http://localhost:3000/api/auth/callback/google
     ```
     (Para producción, agrega también: `https://tudominio.com/api/auth/callback/google`)

7. Haz clic en **"Create"** (Crear)

8. **¡Listo!** Se mostrará un popup con tus credenciales:
   - **Your Client ID** → Este es tu `GOOGLE_CLIENT_ID`
   - **Your Client Secret** → Este es tu `GOOGLE_CLIENT_SECRET`

   ⚠️ **IMPORTANTE**: Copia estos valores inmediatamente, ya que no podrás ver el Client Secret después.

### 5. Agregar las credenciales a tu archivo .env

Abre tu archivo `.env` y agrega:

```env
GOOGLE_CLIENT_ID=tu-client-id-aqui.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=tu-client-secret-aqui
```

## 🔍 Ver credenciales existentes

Si ya creaste las credenciales pero no las copiaste:

1. Ve a **"APIs & Services"** > **"Credentials"**
2. Busca tu OAuth 2.0 Client ID en la lista
3. Haz clic en el nombre o en el ícono de editar
4. Verás el **Client ID** (siempre visible)
5. Para el **Client Secret**, si no lo copiaste antes, tendrás que:
   - Eliminar las credenciales actuales
   - Crear nuevas credenciales
   - **O** usar "Reset secret" si está disponible

## ⚙️ Configuración para producción

Cuando despliegues tu aplicación en producción:

1. Ve a las credenciales OAuth en Google Cloud Console
2. Edita las credenciales
3. Agrega en **Authorized JavaScript origins**:
   ```
   https://tudominio.com
   ```
4. Agrega en **Authorized redirect URIs**:
   ```
   https://tudominio.com/api/auth/callback/google
   ```

## 🧪 Probar el login con Google

1. Asegúrate de tener las variables de entorno configuradas
2. Inicia el servidor: `npm run dev`
3. Ve a `http://localhost:3000/auth/signin`
4. Haz clic en "Continuar con Google"
5. Deberías ver la pantalla de consentimiento de Google
6. Selecciona una cuenta y autoriza la aplicación

## ⚠️ Notas importantes

- **Modo Testing**: Si tu app está en modo "Testing", solo los usuarios que agregaste como "Test users" podrán iniciar sesión
- **Modo Production**: Para que cualquier usuario pueda iniciar sesión, necesitas publicar tu app (puede requerir verificación de Google)
- **Límites**: En modo Testing hay límites de usuarios (100 usuarios)
- **Seguridad**: Nunca compartas tu Client Secret públicamente. Mantén tu archivo `.env` seguro y no lo subas a Git

## 🐛 Solución de problemas

### Error: "redirect_uri_mismatch"
- Verifica que la URI de redirección en Google Cloud Console coincida exactamente con la de tu aplicación
- Asegúrate de incluir `http://localhost:3000/api/auth/callback/google` (con http, no https)

### Error: "access_denied"
- Verifica que la pantalla de consentimiento esté configurada correctamente
- Si estás en modo Testing, asegúrate de agregar tu email como test user

### Error: "invalid_client"
- Verifica que el `GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET` estén correctos en tu `.env`
- Asegúrate de no tener espacios extra o caracteres especiales

### No aparece el botón de Google Login
- Verifica que las variables de entorno estén configuradas
- Reinicia el servidor después de cambiar las variables de entorno

## 📚 Recursos adicionales

- [Documentación oficial de Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2)
- [NextAuth.js - Google Provider](https://next-auth.js.org/providers/google)
