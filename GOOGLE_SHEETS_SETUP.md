# 📊 Configuración de Google Sheets

## Paso a paso para configurar Google Sheets como base de datos

### 1. Crear una hoja de cálculo

1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja de cálculo
3. Nómbrala como quieras (ej: "UCM Tracker Database")
4. **IMPORTANTE**: Copia el ID de la hoja de la URL:
   ```
   https://docs.google.com/spreadsheets/d/[ESTE_ES_EL_ID]/edit
   ```
   Este ID lo necesitarás para `GOOGLE_SHEET_ID` en tu `.env`

### 2. Crear Service Account en Google Cloud

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. **Habilita la API de Google Sheets**:
   - Ve a "APIs & Services" > "Library"
   - Busca "Google Sheets API"
   - Haz clic en "Enable"

4. **Crea un Service Account**:
   - Ve a "IAM & Admin" > "Service Accounts"
   - Haz clic en "Create Service Account"
   - Nombre: `ucm-tracker-service` (o el que prefieras)
   - Descripción: "Service account para UCM Tracker"
   - Haz clic en "Create and Continue"
   - Rol: "Editor" (o puedes dejarlo sin rol)
   - Haz clic en "Done"

5. **Crea una clave JSON**:
   - Haz clic en el Service Account que acabas de crear
   - Ve a la pestaña "Keys"
   - Haz clic en "Add Key" > "Create new key"
   - Selecciona "JSON"
   - Se descargará un archivo JSON

6. **Extrae la información del JSON**:
   Abre el archivo JSON descargado y copia:
   - `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `private_key` → `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` (copia todo incluyendo `\n`)
   - `project_id` → `GOOGLE_PROJECT_ID`

### 3. Compartir la hoja con el Service Account

1. Abre tu hoja de Google Sheets
2. Haz clic en "Compartir" (botón azul en la esquina superior derecha)
3. Pega el `client_email` del Service Account
4. **IMPORTANTE**: Dale permisos de "Editor"
5. Haz clic en "Enviar" (puedes desmarcar "Notificar a las personas")

### 4. Configurar variables de entorno

Crea o actualiza tu archivo `.env`:

```env
# Google Sheets Configuration
GOOGLE_SHEET_ID=tu-sheet-id-aqui
GOOGLE_SERVICE_ACCOUNT_EMAIL=tu-service-account@project.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nTU_CLAVE_AQUI\n-----END PRIVATE KEY-----\n"
GOOGLE_PROJECT_ID=tu-project-id

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu-secret-generado

# Google OAuth (Opcional - para login con Google)
GOOGLE_CLIENT_ID=tu-google-client-id
GOOGLE_CLIENT_SECRET=tu-google-client-secret
```

**Nota sobre `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`**:
- Debe incluir las comillas dobles
- Debe incluir los `\n` literales (no saltos de línea reales)
- Ejemplo completo:
  ```env
  GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
  ```

### 5. Inicializar las hojas

Después de configurar todo, inicializa las hojas de cálculo:

```bash
# Opción 1: Usar curl (después de iniciar el servidor)
curl -X POST http://localhost:3000/api/init

# Opción 2: Las hojas se crearán automáticamente la primera vez que se use la aplicación
```

Las hojas se crearán con estas estructuras:

**Hoja "Users":**
| Email | Name | Password | CreatedAt |
|-------|------|----------|-----------|
| usuario@email.com | Nombre | hash... | 2024-01-01T00:00:00.000Z |

**Hoja "Watched":**
| UserId | ItemId | CreatedAt |
|--------|--------|-----------|
| usuario@email.com | 1 | 2024-01-01T00:00:00.000Z |

## Solución de problemas

### Error: "The caller does not have permission"
- Asegúrate de haber compartido la hoja con el email del Service Account
- Verifica que el Service Account tenga permisos de "Editor"

### Error: "Requested entity was not found"
- Verifica que el `GOOGLE_SHEET_ID` sea correcto
- Asegúrate de que la hoja existe y está compartida

### Error: "Invalid credentials"
- Verifica que el `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` esté correctamente formateado
- Asegúrate de incluir las comillas y los `\n` literales

### Las hojas no se crean automáticamente
- Llama manualmente a `/api/init` después de iniciar el servidor
- Verifica los logs del servidor para ver errores específicos

## Estructura de datos

### Users Sheet
- **Email**: Email del usuario (único)
- **Name**: Nombre del usuario
- **Password**: Contraseña hasheada con bcrypt (vacío para usuarios de Google)
- **CreatedAt**: Fecha de creación en ISO format

### Watched Sheet
- **UserId**: Email del usuario
- **ItemId**: ID del item del UCM (número)
- **CreatedAt**: Fecha en que se marcó como visto

## Ventajas de usar Google Sheets

✅ No necesitas instalar ni configurar una base de datos  
✅ Puedes ver y editar los datos directamente en Google Sheets  
✅ Fácil de hacer backup (solo copiar la hoja)  
✅ Gratis para uso moderado  
✅ Accesible desde cualquier lugar  

## Limitaciones

⚠️ Google Sheets API tiene límites de rate (100 requests por 100 segundos por usuario)  
⚠️ No es ideal para aplicaciones con mucho tráfico  
⚠️ Las consultas pueden ser más lentas que una base de datos tradicional  

Para este proyecto (tracker personal), Google Sheets es perfecto! 🎉
