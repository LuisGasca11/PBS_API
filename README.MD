# API REST - Firebird con Node.js + Express

API RESTful para consultar artículos y claves desde una base de datos Firebird, con frontend en React y Vite.

## 🛠 Tecnologías

### Backend
- **Node.js** v22.14.0
- **Express** 5.1.0
- **Firebird** (node-firebird 1.1.9)
- **dotenv** 17.2.3
- **Swagger UI Express** 5.0.1

### Frontend
- **React** con Vite
- **Axios** para peticiones HTTP

## Requisitos Previos

- Node.js >= v18
- Firebird Server 3.0+ instalado y configurado
- Base de datos Firebird con tablas `ARTICULOS` y `CLAVES_ARTICULOS`


### Backend

```bash
# Clonar el repositorio
git clone <>

# Navegar a la carpeta del backend
cd Backend

# Instalar dependencias
npm install
```

### Frontend

```bash
# Navegar a la carpeta del frontend
cd Frontend

# Instalar dependencias
npm install
```

## Configuración

### 1. Configurar Firebird

Edita el archivo `firebird.conf` (usualmente en `C:\Program Files\Firebird\Firebird_X_X\`):

# Busca esta línea y descoméntala/modifícala:
WireCrypt = Disabled

Reinicia el servicio de Firebird después de este cambio.

### 2. Variables de Entorno

Crea un archivo `.env` en la carpeta `Backend`:

```env
FB_HOST=localhost
FB_PORT=3050
FB_DB=C:TU_RUTA/BD.FDB
FB_USER=SYSDBA
FB_PASSWORD=masterkey
PORT=3000
```


### Iniciar el Backend

npm run dev

El servidor estará disponible en: `http://localhost:3000`

### Iniciar el Frontend


npm run dev


El frontend estará disponible en: `http://localhost:5173` 

### Probar la Conexión

```bash
node testConnection.js
```

Deberías ver: `Conexión exitosa! Resultado de prueba: [...]`

## Endpoints

### Documentación Swagger

Accede a la documentación interactiva en:
```
http://localhost:3000/docs
```

## 📁 Estructura del Proyecto

```
Backend/
├── controllers/
│   ├── articulosController.js
│   └── clavesController.js
├── db/
│   └── firebird.js
├── routes/
│   ├── articulos.js
│   └── claves.js
├── .env
├── server.js
├── testConnection.js
├── swagger.json
└── package.json

Frontend/
├── src/
│   ├── components/
│   │   └── ArticulosList.jsx
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── vite.config.js
```