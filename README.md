# FitLife Node API

API REST para gestión de usuarios, entrenamientos y categorías de fitness con Node.js, Express, Prisma y SQLite.

## 🚀 Features

- ✅ CRUD completo para Users, Workouts y Categories
- ✅ Validaciones personalizadas
- ✅ Paginación (limit/offset) y búsqueda
- ✅ Filtros avanzados (duración, categoría, usuario)
- ✅ Estadísticas globales y por usuario
- ✅ Relaciones con cascade/setNull
- ✅ Documentación HTML interactiva
- ✅ Variables de entorno

## 📦 Instalación

```bash
npm install
```

## ⚙️ Configuración

Crea un archivo `.env` basado en `.env.example`:

```env
DATABASE_URL="file:./dev.db"
PORT=3000
NODE_ENV="development"
```

## 🗄️ Base de Datos

```bash
# Generar cliente Prisma
npx prisma generate

# Ejecutar migraciones
npx prisma migrate dev --name add_categories

# Ver base de datos
npx prisma studio
```

## 🏃 Ejecutar

```bash
# Desarrollo (con nodemon)
npm run dev

# Producción
npm start
```

La API estará disponible en `http://localhost:3000`

## 📚 Endpoints

### Users
- `GET /users?limit=20&offset=0&search=alex` - Listar usuarios
- `GET /users/:id` - Detalles de usuario
- `POST /users` - Crear usuario
- `PUT /users/:id` - Actualizar usuario
- `DELETE /users/:id` - Eliminar usuario

### Workouts
- `GET /workouts?userId=1&categoryId=2&minDuration=30&maxDuration=60&sortBy=durationMinutes&sortOrder=desc` - Listar workouts (con filtros)
- `GET /workouts/:id` - Detalles de workout
- `POST /workouts` - Crear workout
- `PUT /workouts/:id` - Actualizar workout
- `DELETE /workouts/:id` - Eliminar workout

### Categories
- `GET /categories` - Listar categorías (con conteo de workouts)
- `GET /categories/:id` - Detalles de categoría
- `POST /categories` - Crear categoría
- `PUT /categories/:id` - Actualizar categoría
- `DELETE /categories/:id` - Eliminar categoría

### Statistics
- `GET /stats` - Estadísticas generales
- `GET /stats/users/:id` - Estadísticas de usuario

## 🔍 Ejemplos

### Crear usuario
```bash
POST /users
{
  "firstName": "Alex",
  "lastName": "Lopez",
  "email": "alex@mail.com",
  "age": 22
}
```

### Crear categoría
```bash
POST /categories
{
  "name": "Cardio"
}
```

### Crear workout
```bash
POST /workouts
{
  "title": "Morning Run",
  "description": "5K run",
  "durationMinutes": 30,
  "userId": 1,
  "categoryId": 1
}
```

### Filtrar workouts
```bash
GET /workouts?categoryId=1&minDuration=20&sortBy=createdAt&sortOrder=desc
```

### Obtener estadísticas de usuario
```bash
GET /stats/users/1
```

## 🛠️ Tecnologías

- Node.js + Express
- Prisma ORM
- SQLite
- dotenv
- CORS

## 📄 Licencia

MIT
