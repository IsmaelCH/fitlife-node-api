# FitLife API — Node.js RESTful API

FitLife API is a modern and scalable fitness tracking RESTful API built with Node.js and Express.
The project demonstrates CRUD operations, advanced filtering and search, database relations with Prisma ORM,
input validation, and a clean MVC architecture with comprehensive API documentation.

This project was developed as part of an assignment for Erasmus Hogeschool Brussel.

---

## Features

### Core CRUD Operations
- **Users** — Create, read, update, and delete user profiles
- **Workouts** — Full workout management with duration tracking
- **Categories** — Organize workouts by fitness categories
- All endpoints support proper HTTP verbs (GET, POST, PUT, DELETE)

### Advanced Filtering & Search
- **Pagination** — Limit and offset support on all list endpoints
- **Full-text search** — Search users by name, workouts by title/description
- **Multi-field filtering** — Filter workouts by:
  - User ID (get workouts from specific user)
  - Category ID (filter by workout type)
  - Duration range (min/max duration in minutes)
- **Sorting** — Sort results by multiple fields (id, title, duration, date)
- **Sort order** — Ascending or descending order

### Data Validation
- **Input validation** — All create/update operations validated
- **Type checking** — Numbers, strings, and required fields enforced
- **Business rules** — Names cannot contain digits, emails must be unique
- **Relationship validation** — Foreign keys verified before creation
- **Descriptive errors** — Clear error messages for validation failures

### Statistics & Analytics
- **Overall statistics** — Total counts, averages, top categories
- **Per-user statistics** — Individual user analytics with workout breakdown
- **Weekly data** — Time-based workout tracking

### Database Relations
- **One-to-Many** — Users have multiple workouts
- **Optional relationships** — Workouts can be categorized or uncategorized
- **Cascading deletes** — Deleting a user removes their workouts
- **Soft deletes** — Categories set to null on delete (preserves workout history)

### API Documentation
- **Interactive web interface** — HTML documentation at root endpoint
- **Live demo page** — Test all endpoints with real-time responses
- **Data creation forms** — User-friendly forms to create test data
- **Visual data display** — See created users, categories, and workouts instantly
- **Code examples** — Sample requests for all endpoints

---

## Technical Stack

### Backend
- **Node.js v23.11.0** (>= 20 required)
- **Express 4.19.2** — Fast, minimalist web framework
- **Prisma ORM 6.0.0** — Modern database toolkit
- **SQLite** — Embedded database (easy setup, no server required)

### Data & Validation
- **Custom validators** — Input validation without external libraries
- **Prisma schema** — Type-safe database modeling
- **Environment variables** — dotenv for configuration management

### Development Tools
- **Nodemon** — Auto-restart on file changes
- **CORS** — Cross-Origin Resource Sharing enabled
- **Database migrations** — Version-controlled schema changes
- **Database seeding** — Sample data generation

### Frontend Documentation
- **Vanilla JavaScript** — No framework dependencies
- **Fetch API** — Modern HTTP requests
- **Responsive design** — Mobile-first CSS
- **Minimalist UI** — Clean, professional interface

---

## Installation & Setup

### Prerequisites
- Node.js 20 or later
- npm (comes with Node.js)

### Quick Start

```bash
# 1. Clone the repository
git clone <repository-url>
cd fitlife-node-api

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env if needed (default uses SQLite)

# 4. Run database migrations
npx prisma migrate dev

# 5. Seed the database with sample data (optional)
npm run seed

# 6. Start the development server
npm run dev

# 7. Open browser to http://localhost:3000
```

### Available Scripts

- `npm run dev` — Start development server with auto-reload
- `npm start` — Start production server
- `npm run seed` — Populate database with sample data
- `npx prisma studio` — Open visual database editor
- `npx prisma migrate dev` — Create and apply new migration

---

## API Endpoints

### Users
- `GET /users?limit=20&offset=0&search=alex` — List users (pagination + search)
- `GET /users/:id` — Get user details (includes workouts)
- `POST /users` — Create new user
- `PUT /users/:id` — Update user
- `DELETE /users/:id` — Delete user (cascades to workouts)

### Workouts
- `GET /workouts?limit=20&offset=0` — List workouts (pagination)
- `GET /workouts?search=running` — Search workouts
- `GET /workouts?userId=1&categoryId=2` — Filter by user and category
- `GET /workouts?minDuration=30&maxDuration=60` — Filter by duration range
- `GET /workouts?sortBy=durationMinutes&sortOrder=desc` — Sort results
- `GET /workouts/:id` — Get workout details
- `POST /workouts` — Create new workout
- `PUT /workouts/:id` — Update workout
- `DELETE /workouts/:id` — Delete workout

### Categories
- `GET /categories` — List all categories
- `GET /categories/:id` — Get category details (includes workouts)
- `POST /categories` — Create new category
- `PUT /categories/:id` — Update category
- `DELETE /categories/:id` — Delete category

### Statistics
- `GET /stats` — Overall statistics (total users, workouts, categories, averages)
- `GET /stats/users/:id` — Per-user statistics (workout breakdown, weekly data)

---

## Database Schema

### Models

**User**
- `id` — Auto-increment primary key
- `firstName` — String, required
- `lastName` — String, required
- `email` — String, unique, required
- `age` — Integer, required
- `createdAt` — Timestamp
- `updatedAt` — Timestamp

**Category**
- `id` — Auto-increment primary key
- `name` — String, unique, required
- `description` — String, optional
- `createdAt` — Timestamp

**Workout**
- `id` — Auto-increment primary key
- `title` — String, required
- `description` — String, optional
- `durationMinutes` — Integer, required
- `userId` — Foreign key (User)
- `categoryId` — Foreign key (Category), optional
- `createdAt` — Timestamp
- `updatedAt` — Timestamp

### Relationships

**One-to-Many**
- User → Workouts (`hasMany`)
  - A user can have multiple workouts
  - Delete user cascades to workouts
  
- Category → Workouts (`hasMany`)
  - A category can be assigned to multiple workouts
  - Delete category sets workouts.categoryId to null

**Belongs-To**
- Workout → User (`belongsTo`)
- Workout → Category (`belongsTo`, optional)


---

## Extra Features Beyond Minimum Requirements

The assignment requires basic CRUD operations (10-12/20). This project includes additional features:

✅ **Advanced search** — Multi-field search across related models  
✅ **Result sorting** — Sort by multiple fields with configurable order  
✅ **Advanced validation** — Business rule enforcement beyond blank field checks  
✅ **Pagination** — Limit/offset support for all list endpoints  
✅ **Range filtering** — Min/max duration filtering with combined logic  
✅ **Statistics API** — Aggregate data endpoints with analytics  
✅ **Relationship filtering** — Filter by foreign keys (userId, categoryId)  
✅ **Interactive documentation** — Web-based API explorer with live testing  
✅ **Data visualization** — Real-time display of created entities  
✅ **Optional relationships** — Flexible category assignment  
✅ **Cascading operations** — Smart delete behavior to maintain data integrity  

---

## Sources & Resources

### Documentation & Frameworks
- **Node.js Documentation**  
  https://nodejs.org/docs  
  Official Node.js runtime documentation

- **Express.js Documentation**  
  https://expressjs.com  
  Fast, unopinionated web framework for Node.js

- **Prisma Documentation**  
  https://www.prisma.io/docs  
  Modern database toolkit with type-safe queries

- **SQLite Documentation**  
  https://www.sqlite.org/docs.html  
  Embedded SQL database engine

### Development Tools & AI Assistants
- **GitHub Copilot**  
  https://github.com/features/copilot  
  AI-powered code completion used for route setup, validation logic,
  and API endpoint implementation

- **OpenAI ChatGPT**  
  https://chat.openai.com  
  Used for learning Express best practices, understanding Prisma ORM,
  debugging async/await patterns, and exploring REST API design

- **Claude (Anthropic)**  
  AI assistant used throughout development for architecture decisions,
  code review, MVC pattern implementation, and comprehensive feature development

### Learning Resources
- **MDN Web Docs**  
  https://developer.mozilla.org  
  JavaScript, HTTP methods, and REST API reference

- **Prisma Examples**  
  https://github.com/prisma/prisma-examples  
  Community examples for different tech stacks

- **REST API Tutorial**  
  https://restfulapi.net  
  Best practices for RESTful API design

- **Stack Overflow**  
  https://stackoverflow.com  
  Community troubleshooting for specific issues

---

## Academic Integrity Statement

All code in this project was written by the student with assistance from AI tools
(GitHub Copilot, ChatGPT, Claude) used as learning aids and productivity enhancers.
The student maintains full understanding of all implemented features and can explain
any part of the codebase. AI tools were used for:

- Code suggestions and autocompletion
- Debugging and error resolution
- Learning Express.js and Prisma best practices
- Understanding async/await patterns and promise handling
- Exploring REST API design patterns
- Implementing advanced filtering and search functionality

All architectural decisions, feature implementations, and final code were reviewed,
understood, and approved by the student. The student can independently explain and
modify any aspect of the project.

---

## License

This is an educational project developed for Erasmus Hogeschool Brussel.  
All rights reserved by the student author.

---

## Contact

For questions or feedback about this project, please contact the repository owner.
