# 🚀 Guía de Configuración

## Pasos para configurar el proyecto

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar Google Sheets como base de datos

#### a) Crear una hoja de cálculo en Google Sheets
1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja de cálculo
3. Comparte la hoja con el email de tu Service Account (ver siguiente paso)
4. Copia el ID de la hoja de la URL: `https://docs.google.com/spreadsheets/d/[ESTE_ES_EL_ID]/edit`

#### b) Crear Service Account en Google Cloud
1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la API de Google Sheets
4. Ve a "IAM & Admin" > "Service Accounts"
5. Crea una nueva Service Account
6. Descarga la clave JSON
7. Copia el `client_email` y `private_key` del JSON

### 3. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto:

```env
# Google Sheets
GOOGLE_SHEET_ID=tu-sheet-id-aqui
GOOGLE_SERVICE_ACCOUNT_EMAIL=tu-service-account@project.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_PROJECT_ID=tu-project-id

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu-secret-aqui
GOOGLE_CLIENT_ID=tu-google-client-id
GOOGLE_CLIENT_SECRET=tu-google-client-secret
```

**Generar NEXTAUTH_SECRET:**
```bash
# En Windows PowerShell:
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))

# O en Linux/Mac:
openssl rand -base64 32
```

### 3. Mover imágenes
Copia todas las imágenes de la carpeta `imgs/` a `public/imgs/`:

```bash
# En Windows PowerShell:
Copy-Item -Path imgs\* -Destination public\imgs\ -Recurse

# En Linux/Mac:
cp -r imgs/* public/imgs/
```

### 4. Inicializar las hojas de cálculo
Después de configurar las variables de entorno, inicializa las hojas:

```bash
# Opción 1: Usar la API endpoint (después de iniciar el servidor)
curl -X POST http://localhost:3000/api/init

# Opción 2: Las hojas se crearán automáticamente la primera vez que se use
```

Las hojas se crearán con las siguientes columnas:
- **Users**: Email, Name, Password, CreatedAt
- **Watched**: UserId, ItemId, CreatedAt

### 5. Iniciar el servidor
```bash
npm run dev
```

## Configurar Google OAuth (Opcional)

1. En el mismo proyecto de Google Cloud Console
2. Ve a "Credenciales" > "Crear credenciales" > "ID de cliente OAuth 2.0"
3. Tipo de aplicación: "Aplicación web"
4. Agrega `http://localhost:3000/api/auth/callback/google` como URI de redirección autorizada
5. Copia el Client ID y Client Secret a tu archivo `.env`

## Notas

- Si no configuras Google OAuth, los usuarios solo podrán registrarse con email/contraseña
- La base de datos es Google Sheets, no necesitas instalar nada adicional
- Asegúrate de compartir la hoja de cálculo con el email de tu Service Account
- El Service Account necesita permisos de "Editor" en la hoja de cálculo
