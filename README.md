# OptiForge AI - Backend

> Production-ready backend boilerplate for OptiForge AI, an AI-powered product design optimization SaaS platform.

## 🚀 Features

- **Modern Tech Stack**: Node.js, Express.js, Prisma ORM
- **Authentication**: JWT-based authentication with bcrypt password hashing
- **Database**: SQLite (easily scalable to PostgreSQL)
- **Architecture**: Clean MVC pattern with modular design
- **Security**: Helmet, CORS, rate limiting
- **Error Handling**: Centralized error handling with custom error classes
- **Validation**: Request validation middleware
- **ES6 Modules**: Full ESM support

## 📋 Prerequisites

- Node.js >= 18.0.0
- npm or yarn

## 🛠️ Installation

1. **Clone the repository** (or navigate to the project directory)

```bash
cd c:\Gowtham\Optiforge-Ai
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
# Copy the example env file
cp .env.example .env

# Edit .env and update the values
```

Required environment variables:
```env
PORT=5000
NODE_ENV=development
DATABASE_URL="file:./dev.db"
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
```

4. **Set up the database**

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations (creates the database)
npx prisma migrate dev --name init

# (Optional) Open Prisma Studio to view your database
npx prisma studio
```

## 🚀 Running the Server

### Development Mode (with auto-reload)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will start on `http://localhost:5000`

## 📡 API Endpoints

### Health Check
- **GET** `/health` - Check if the API is running

### Authentication (`/api/auth`)
- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/login` - Login user
- **GET** `/api/auth/me` - Get current user profile (Protected)

### Projects (`/api/projects`)
- **POST** `/api/projects` - Create a new project (Protected)
- **GET** `/api/projects` - Get all user projects (Protected)
- **GET** `/api/projects/:id` - Get a single project (Protected)
- **PUT** `/api/projects/:id` - Update a project (Protected)
- **DELETE** `/api/projects/:id` - Delete a project (Protected)

### Designs (`/api/designs`)
- **POST** `/api/designs` - Create a new design (Protected)
- **GET** `/api/designs/project/:projectId` - Get all designs for a project (Protected)
- **GET** `/api/designs/:id` - Get a single design (Protected)

### Analysis (`/api/analysis`)
- **POST** `/api/analysis` - Create a new analysis report (Protected)
- **GET** `/api/analysis/design/:designId` - Get analysis for a design (Protected)
- **PUT** `/api/analysis/design/:designId` - Update an analysis report (Protected)

## 📚 API Usage Examples

### Register a User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Create a Project (Protected)

```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "My First Project",
    "description": "A design optimization project"
  }'
```

### Create a Design

```bash
curl -X POST http://localhost:5000/api/designs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "type": "manual",
    "parameters": {
      "material": "aluminum",
      "dimensions": {
        "width": 100,
        "height": 50
      }
    },
    "projectId": "PROJECT_ID"
  }'
```

### Create an Analysis Report

```bash
curl -X POST http://localhost:5000/api/analysis \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "score": 85.5,
    "warnings": ["High stress point detected", "Consider reinforcement"],
    "costEstimate": 1250.00,
    "designId": "DESIGN_ID"
  }'
```

## 📁 Project Structure

```
optiforge-ai-backend/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── config/
│   │   ├── database.js        # Prisma client configuration
│   │   └── jwt.js             # JWT configuration
│   ├── middlewares/
│   │   ├── auth.middleware.js # JWT authentication
│   │   ├── error.middleware.js # Error handling
│   │   └── validate.middleware.js # Request validation
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.controller.js
│   │   │   ├── auth.service.js
│   │   │   └── auth.routes.js
│   │   ├── project/
│   │   │   ├── project.controller.js
│   │   │   ├── project.service.js
│   │   │   └── project.routes.js
│   │   ├── design/
│   │   │   ├── design.controller.js
│   │   │   ├── design.service.js
│   │   │   └── design.routes.js
│   │   └── analysis/
│   │       ├── analysis.controller.js
│   │       ├── analysis.service.js
│   │       └── analysis.routes.js
│   ├── utils/
│   │   ├── errors.util.js     # Custom error classes
│   │   └── response.util.js   # API response utilities
│   ├── app.js                 # Express app setup
│   └── server.js              # Server entry point
├── .env.example               # Environment variables template
├── .gitignore
├── package.json
└── README.md
```

## 🗄️ Database Schema

### Models

- **User**: Authentication and user management
- **Project**: User projects
- **Design**: Manual and AI-generated designs
- **Analysis**: Analysis reports for designs

### Relations

- User → Projects (one-to-many)
- Project → Designs (one-to-many)
- Design → Analysis (one-to-one)

## 🔐 Security Features

- **Helmet**: Security headers
- **CORS**: Configured for specific origin
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Request validation middleware

## 🛡️ Error Handling

Centralized error handling with custom error classes:
- `ValidationError` (400)
- `AuthError` (401)
- `ForbiddenError` (403)
- `NotFoundError` (404)
- `ConflictError` (409)

## 📝 API Response Format

All API responses follow this consistent format:

**Success Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message"
}
```

## 🔄 Database Migration

When you update the Prisma schema:

```bash
# Create a new migration
npx prisma migrate dev --name your_migration_name

# Apply migrations in production
npx prisma migrate deploy
```

## 🧪 Testing the API

You can test the API using:
- **Postman** or **Insomnia** (import the endpoints)
- **cURL** (examples provided above)
- **Thunder Client** (VS Code extension)

## 🚀 Scaling to PostgreSQL

To scale from SQLite to PostgreSQL:

1. Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

2. Update `.env`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/optiforge"
```

3. Run migrations:
```bash
npx prisma migrate dev
```

## 📄 License

MIT

## 👥 Author

OptiForge AI Team

---

**Built with ❤️ for production-ready SaaS applications**
