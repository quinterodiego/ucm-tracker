# 🐙 Guía Rápida: Subir a GitHub

## Comandos rápidos

### 1. Inicializar Git (si no lo has hecho)
```bash
git init
```

### 2. Agregar todos los archivos
```bash
git add .
```

### 3. Hacer el primer commit
```bash
git commit -m "Initial commit: UCM Tracker con Next.js"
```

### 4. Crear repositorio en GitHub
1. Ve a https://github.com/new
2. Nombre: `ucm-tracker`
3. Descripción: "Tracker del Universo Cinematográfico de Marvel"
4. Elige Public o Private
5. **NO marques** "Initialize with README"
6. Haz clic en "Create repository"

### 5. Conectar y subir
```bash
# Reemplaza TU_USUARIO con tu usuario de GitHub
git remote add origin https://github.com/TU_USUARIO/ucm-tracker.git
git branch -M main
git push -u origin main
```

## ⚠️ Archivos que NO se suben (están en .gitignore)

- `.env` - Variables de entorno (nunca subir)
- `node_modules/` - Dependencias
- `.next/` - Build de Next.js
- `ucm-tracker-*.json` - Credenciales de Service Account

## ✅ Archivos que SÍ se suben

- Todo el código fuente
- `package.json` y `package-lock.json`
- Configuraciones (tsconfig.json, next.config.js, etc.)
- README.md y documentación
- Componentes y páginas

## 🔄 Actualizar el repositorio

Cada vez que hagas cambios:

```bash
git add .
git commit -m "Descripción de los cambios"
git push
```

## 📝 Siguiente paso

Una vez subido a GitHub, sigue la guía en `DEPLOY.md` para desplegar en Vercel.
