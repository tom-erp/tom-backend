# TOM Backend System

Tech Onshore MEP-Prefabricators (TOM) Backend API built with Node.js, Express, and PostgreSQL.

## Prerequisites

- Node.js 18+ 
- PostgreSQL 15+
- npm or yarn

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Edit `.env` with your database credentials:

```env
NODE_ENV=development
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=tom_db
DB_USER=postgres
DB_PASSWORD=postgres

JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=7d
```

### 3. Database Setup

Create the database:

```bash
createdb tom_db
```

Or using PostgreSQL client:

```sql
CREATE DATABASE tom_db;
```

### 4. Run Migrations

```bash
npm run migrate
```

Or using Knex directly:

```bash
npx knex migrate:latest
```

### 5. Run Seeds (Optional)

```bash
npm run seed
```

Or using Knex directly:

```bash
npx knex seed:run
```

### 6. Start Development Server

```bash
npm run dev
```

The server will start on `http://localhost:3000`

### 7. Start Production Server

```bash
npm start
```

## Project Structure

```
tom-backend/
├── src/
│   ├── config/          # Configuration files
│   ├── modules/         # Module-based architecture (32 modules)
│   ├── middlewares/     # Express middlewares
│   ├── utils/           # Utilities and helpers
│   ├── migrations/      # Database migrations
│   ├── seeds/           # Database seeds
│   ├── jobs/            # Background jobs
│   ├── routes/          # Route definitions
│   ├── app.js           # Express app setup
│   └── server.js        # Server entry point
├── docs/                # Documentation
│   └── architecture/    # Architecture documentation
├── tests/               # Test files
└── uploads/             # File uploads directory
```

## Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run migrate` - Run database migrations
- `npm run migrate:rollback` - Rollback last migration
- `npm run seed` - Run database seeds
- `npm test` - Run tests
- `npm run lint` - Run ESLint

## Documentation

- [Backend Architecture](./docs/architecture/BACKEND_ARCHITECTURE.md)
- [Database Architecture](./docs/architecture/DATABASE_ARCHITECTURE.md)
- [Workflow Documentation](./docs/architecture/WORKFLOW_DOCUMENTATION.md)

## Technology Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: PostgreSQL 15+
- **ORM/Query Builder**: Knex.js
- **Authentication**: JWT
- **Validation**: Joi
- **Logging**: Winston
- **File Upload**: Multer

## License

Private - All rights reserved
