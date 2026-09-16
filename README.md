# API REST - Gestión de Incidencias

API REST desarrollada con Node.js y Express para gestionar incidencias de una empresa.

## Tecnologías

- Node.js
- Express 5.2.1
- Nodemon 3.1.14 (desarrollo)

## Instalación y ejecución

```bash
npm install
npm start
```

Para desarrollo (recarga automática):
```bash
npm run dev
```

Servidor: `http://localhost:3000`

## Estructura del proyecto

```
├── app.js
├── routes/
│   └── incidencias.js
├── controllers/
│   └── incidenciasController.js
├── utils/
│   └── helper.js
└── package.json
```

## Modelo de datos

| Campo | Tipo | Valores |
|-------|------|---------|
| id | number | Generado automáticamente |
| empleado | string | Nombre del empleado |
| area | string | Área o departamento |
| descripcion | string | Descripción de la incidencia |
| prioridad | string | Alta, Media, Baja |
| estado | string | Pendiente, En Proceso, Resuelta, Cancelada |

## Endpoints

| Método | Ruta | Función |
|--------|------|---------|
| POST | `/incidencias` | Crear incidencia |
| GET | `/incidencias` | Listar incidencias |
| GET | `/incidencias/:id` | Buscar por ID |
| PUT | `/incidencias/:id/estado` | Cambiar estado (estado en body) |
| DELETE | `/incidencias/:id` | Eliminar incidencia |
| GET | `/incidencias/estadisticas` | Ver estadísticas |
| GET | `/incidencias/:id/clasificacion` | Clasificar prioridad |

## Ejemplos de uso

### Crear incidencia

```bash
POST /incidencias
Content-Type: application/json

{
  "empleado": "Maria Lopez",
  "area": "TI",
  "descripcion": "La computadora no enciende",
  "prioridad": "Alta"
}
```

**Respuesta exitosa (200):**
```json
{
  "message": "La solicitud se guardo con el ID : 1"
}
```

**Errores:**
- 400: Campo obligatorio faltante o vacío
- 400: Prioridad inválida (debe ser Alta, Media o Baja)

### Listar incidencias

```bash
GET /incidencias
```

**Respuesta (200):**
```json
[
  {
    "id": 1,
    "empleado": "Maria Lopez",
    "area": "TI",
    "descripcion": "La computadora no enciende",
    "prioridad": "Alta",
    "estado": "Pendiente"
  }
]
```

### Buscar por ID

```bash
GET /incidencias/1
```

### Cambiar estado

```bash
PUT /incidencias/1/estado
Content-Type: application/json

{
  "estado": "En Proceso"
}
```

**Estados válidos:** `Pendiente`, `En Proceso`, `Resuelta`, `Cancelada`

**Errores:**
- 400: Incidencia no encontrada
- 400: Estado vacío o inválido

### Eliminar incidencia

```bash
DELETE /incidencias/1
```

### Estadísticas

```bash
GET /incidencias/estadisticas
```

**Respuesta (200):**
```json
{
  "totalIncidencias": 5,
  "pendientes": 2,
  "enProceso": 1,
  "resueltas": 1,
  "canceladas": 1
}
```

### Clasificación de prioridad

```bash
GET /incidencias/1/clasificacion
```

**Respuesta (200):**
```json
{
  "id": 1,
  "clas": "Critica"
}
```

**Mapeo:**
| Prioridad | Clasificación |
|-----------|---------------|
| Alta | Critica |
| Media | Importante |
| Baja | Normal |

## Validaciones

- **Campos obligatorios:** `empleado`, `area`, `descripcion`, `prioridad`
- **Prioridad:** Debe ser exactamente `Alta`, `Media` o `Baja` (case-sensitive)
- **Estado (PUT):** Debe ser uno de los 4 valores válidos
- **IDs:** Número entero positivo existente

## Integrantes

| Nombre | Carnet |
|--------|--------|
| Oscar Ignacio Gil Villalta | 00186825 |
| | |
| | |