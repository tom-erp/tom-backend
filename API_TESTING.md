# API Testing Guide

## Postman Collection

Import `TOM_API.postman_collection.json` into Postman to test all endpoints.

## Quick Start

### 1. Start the Server

```bash
npm run dev
```

Server will run on `http://localhost:3000`

### 2. Test Authentication

#### Register a New User

```bash
POST http://localhost:3000/api/v1/auth/register
Content-Type: application/json

{
  "email": "admin@tom.com",
  "password": "admin123",
  "first_name": "Admin",
  "last_name": "User",
  "role": "admin"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "email": "admin@tom.com",
      "first_name": "Admin",
      "last_name": "User",
      "role": "admin",
      "status": "active"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Login

```bash
POST http://localhost:3000/api/v1/auth/login
Content-Type: application/json

{
  "email": "admin@tom.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { ... },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 3. Test Protected Endpoints

Use the `token` from login/register in the Authorization header:

```bash
GET http://localhost:3000/api/v1/auth/me
Authorization: Bearer <your_token_here>
```

## Available Endpoints

### Authentication (Public)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/register` | Register new user |
| POST | `/api/v1/auth/login` | Login user |
| POST | `/api/v1/auth/refresh` | Refresh access token |
| GET | `/api/v1/auth/me` | Get current user profile (Protected) |

### Users (All Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/users` | Get all users |
| GET | `/api/v1/users/:id` | Get user by ID |
| GET | `/api/v1/users/:id/organization` | Get user with organization |
| GET | `/api/v1/users/role/:role` | Get users by role |
| GET | `/api/v1/users/organization/:id` | Get users by organization |
| POST | `/api/v1/users` | Create new user |
| PUT | `/api/v1/users/:id` | Update user |
| DELETE | `/api/v1/users/:id` | Delete user |

## Sample Requests

### Create User

```json
POST /api/v1/users
Authorization: Bearer <token>
Content-Type: application/json

{
  "email": "engineer@tom.com",
  "password": "password123",
  "first_name": "John",
  "last_name": "Engineer",
  "role": "site_engineer",
  "phone": "+65 1234 5678",
  "department": "Engineering",
  "organization_id": 1
}
```

### Update User

```json
PUT /api/v1/users/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "first_name": "Jane",
  "last_name": "Engineer",
  "phone": "+65 9876 5432",
  "department": "Sales"
}
```

## Available Roles

1. `admin` - System Administrator
2. `sales_executive` - Sales Executive
3. `sales_manager` - Sales Manager
4. `project_manager` - Project Manager
5. `procurement_officer` - Procurement Officer
6. `site_engineer` - Site Engineer
7. `finance_officer` - Finance Officer
8. `qc_officer` - Quality Control Officer
9. `workshop_supervisor` - Workshop Supervisor
10. `hr_officer` - HR Officer

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "error": {
    "message": "Error message here",
    "code": "ERROR_CODE"
  }
}
```

Common error codes:
- `VALIDATION_ERROR` - Request validation failed
- `UNAUTHORIZED` - Authentication required
- `INVALID_TOKEN` - Invalid JWT token
- `TOKEN_EXPIRED` - Token has expired
- `NOT_FOUND` - Resource not found
- `DUPLICATE_ENTRY` - Resource already exists
- `INTERNAL_SERVER_ERROR` - Server error

## Testing Tips

1. **Always start with Register/Login** to get a token
2. **Copy the token** from the response
3. **Use Bearer token** in Authorization header for protected endpoints
4. **Check response status codes**:
   - 200/201 - Success
   - 400 - Bad Request (validation error)
   - 401 - Unauthorized (invalid/missing token)
   - 404 - Not Found
   - 409 - Conflict (duplicate entry)
   - 500 - Server Error
