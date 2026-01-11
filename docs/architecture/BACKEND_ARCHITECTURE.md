# TOM System - Backend Architecture Documentation

## Overview
This document describes the production-ready backend architecture for the Tech Onshore MEP-Prefabricators (TOM) system using Node.js, Express.js, and PostgreSQL.

## Technology Stack

- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Language**: JavaScript (ES6+)
- **Database**: PostgreSQL
- **ORM/Query Builder**: Knex.js (for migrations and queries)
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Joi or express-validator
- **File Upload**: multer
- **Email**: nodemailer
- **Logging**: winston
- **Environment**: dotenv
- **API Documentation**: Swagger/OpenAPI
- **Testing**: Jest
- **Containerization**: Docker

---

## Project Structure

**Note:** This architecture follows a **module-based structure** (similar to stance-dashboard), where each module is self-contained with its own controller, service, repository, model, routes, and validators.

```
tom-backend/
│
├── src/
│   ├── config/
│   │   ├── database.js          # PostgreSQL connection configuration
│   │   ├── env.js               # Environment variables validation
│   │   ├── jwt.js               # JWT configuration
│   │   ├── multer.js            # File upload configuration
│   │   └── email.js             # Email service configuration
│   │
│   ├── modules/                 # Module-based architecture (self-contained modules)
│   │   │
│   │   ├── base/                # Base module (shared base classes)
│   │   │   ├── base.model.js
│   │   │   ├── base.service.js
│   │   │   └── base.controller.js
│   │   │
│   │   ├── auth/                # Authentication Module
│   │   │   ├── auth.controller.js
│   │   │   ├── auth.service.js
│   │   │   ├── auth.repository.js
│   │   │   ├── auth.model.js
│   │   │   ├── auth.routes.js
│   │   │   ├── auth.validator.js
│   │   │   └── index.js         # Module exports
│   │   │
│   │   ├── user/                # User Module
│   │   │   ├── user.controller.js
│   │   │   ├── user.service.js
│   │   │   ├── user.repository.js
│   │   │   ├── user.model.js
│   │   │   ├── user.routes.js
│   │   │   ├── user.validator.js
│   │   │   └── index.js
│   │   │
│   │   ├── organization/        # Organization Module (Clients/Vendors)
│   │   │   ├── organization.controller.js
│   │   │   ├── organization.service.js
│   │   │   ├── organization.repository.js
│   │   │   ├── organization.model.js
│   │   │   ├── organization.routes.js
│   │   │   ├── organization.validator.js
│   │   │   └── index.js
│   │   │
│   │   ├── sales-enquiry/       # Sales Enquiry Module
│   │   │   ├── enquiry.controller.js
│   │   │   ├── enquiry.service.js
│   │   │   ├── enquiry.repository.js
│   │   │   ├── enquiry.model.js
│   │   │   ├── enquiry.routes.js
│   │   │   ├── enquiry.validator.js
│   │   │   └── index.js
│   │   │
│   │   ├── sales-quotation/     # Sales Quotation Module
│   │   │   ├── quotation.controller.js
│   │   │   ├── quotation.service.js
│   │   │   ├── quotation.repository.js
│   │   │   ├── quotation.model.js
│   │   │   ├── quotation-item.model.js
│   │   │   ├── quotation.routes.js
│   │   │   ├── quotation.validator.js
│   │   │   └── index.js
│   │   │
│   │   ├── client-purchase-order/  # Client PO Module
│   │   │   ├── client-po.controller.js
│   │   │   ├── client-po.service.js
│   │   │   ├── client-po.repository.js
│   │   │   ├── client-po.model.js
│   │   │   ├── client-po-item.model.js
│   │   │   ├── client-po.routes.js
│   │   │   ├── client-po.validator.js
│   │   │   └── index.js
│   │   │
│   │   ├── sales-order/         # Sales Order Module
│   │   │   ├── sales-order.controller.js
│   │   │   ├── sales-order.service.js
│   │   │   ├── sales-order.repository.js
│   │   │   ├── sales-order.model.js
│   │   │   ├── sales-order-item.model.js
│   │   │   ├── sales-order.routes.js
│   │   │   ├── sales-order.validator.js
│   │   │   └── index.js
│   │   │
│   │   ├── project/             # Project Module
│   │   │   ├── project.controller.js
│   │   │   ├── project.service.js
│   │   │   ├── project.repository.js
│   │   │   ├── project.model.js
│   │   │   ├── project-budget.model.js
│   │   │   ├── project.routes.js
│   │   │   ├── project.validator.js
│   │   │   └── index.js
│   │   │
│   │   ├── project-task/        # Project Task Module
│   │   │   ├── project-task.controller.js
│   │   │   ├── project-task.service.js
│   │   │   ├── project-task.repository.js
│   │   │   ├── project-task.model.js
│   │   │   ├── project-task.routes.js
│   │   │   ├── project-task.validator.js
│   │   │   └── index.js
│   │   │
│   │   ├── project-schedule/    # Project Schedule Module
│   │   │   ├── project-schedule.controller.js
│   │   │   ├── project-schedule.service.js
│   │   │   ├── project-schedule.repository.js
│   │   │   ├── project-schedule.model.js
│   │   │   ├── project-schedule.routes.js
│   │   │   ├── project-schedule.validator.js
│   │   │   └── index.js
│   │   │
│   │   ├── wip/                 # Work in Progress Module
│   │   │   ├── wip.controller.js
│   │   │   ├── wip.service.js
│   │   │   ├── wip.repository.js
│   │   │   ├── wip.model.js
│   │   │   ├── wip-material-usage.model.js
│   │   │   ├── wip.routes.js
│   │   │   ├── wip.validator.js
│   │   │   └── index.js
│   │   │
│   │   ├── purchase-request/    # Purchase Request (PR) Module
│   │   │   ├── pr.controller.js
│   │   │   ├── pr.service.js
│   │   │   ├── pr.repository.js
│   │   │   ├── pr.model.js
│   │   │   ├── pr-item.model.js
│   │   │   ├── pr.routes.js
│   │   │   ├── pr.validator.js
│   │   │   └── index.js
│   │   │
│   │   ├── purchase-order/      # Purchase Order (PO) Module
│   │   │   ├── po.controller.js
│   │   │   ├── po.service.js
│   │   │   ├── po.repository.js
│   │   │   ├── po.model.js
│   │   │   ├── po-item.model.js
│   │   │   ├── po.routes.js
│   │   │   ├── po.validator.js
│   │   │   └── index.js
│   │   │
│   │   ├── vendor/              # Vendor Module
│   │   │   ├── vendor.controller.js
│   │   │   ├── vendor.service.js
│   │   │   ├── vendor.repository.js
│   │   │   ├── vendor.model.js
│   │   │   ├── vendor.routes.js
│   │   │   ├── vendor.validator.js
│   │   │   └── index.js
│   │   │
│   │   ├── item-receipt/        # Item Receipt Module
│   │   │   ├── item-receipt.controller.js
│   │   │   ├── item-receipt.service.js
│   │   │   ├── item-receipt.repository.js
│   │   │   ├── item-receipt.model.js
│   │   │   ├── item-receipt-item.model.js
│   │   │   ├── item-receipt.routes.js
│   │   │   ├── item-receipt.validator.js
│   │   │   └── index.js
│   │   │
│   │   ├── grn/                 # Goods Received Note Module
│   │   │   ├── grn.controller.js
│   │   │   ├── grn.service.js
│   │   │   ├── grn.repository.js
│   │   │   ├── grn.model.js
│   │   │   ├── grn-item.model.js
│   │   │   ├── grn.routes.js
│   │   │   ├── grn.validator.js
│   │   │   └── index.js
│   │   │
│   │   ├── vendor-bill/         # Vendor Bill Module
│   │   │   ├── vendor-bill.controller.js
│   │   │   ├── vendor-bill.service.js
│   │   │   ├── vendor-bill.repository.js
│   │   │   ├── vendor-bill.model.js
│   │   │   ├── vendor-bill-item.model.js
│   │   │   ├── vendor-bill.routes.js
│   │   │   ├── vendor-bill.validator.js
│   │   │   └── index.js
│   │   │
│   │   ├── vendor-prepayment/   # Vendor Prepayment Module
│   │   │   ├── vendor-prepayment.controller.js
│   │   │   ├── vendor-prepayment.service.js
│   │   │   ├── vendor-prepayment.repository.js
│   │   │   ├── vendor-prepayment.model.js
│   │   │   ├── vendor-prepayment.routes.js
│   │   │   ├── vendor-prepayment.validator.js
│   │   │   └── index.js
│   │   │
│   │   ├── voucher/             # Voucher Module
│   │   │   ├── voucher.controller.js
│   │   │   ├── voucher.service.js
│   │   │   ├── voucher.repository.js
│   │   │   ├── voucher.model.js
│   │   │   ├── voucher.routes.js
│   │   │   ├── voucher.validator.js
│   │   │   └── index.js
│   │   │
│   │   ├── vendor-payment/      # Vendor Payment Module
│   │   │   ├── vendor-payment.controller.js
│   │   │   ├── vendor-payment.service.js
│   │   │   ├── vendor-payment.repository.js
│   │   │   ├── vendor-payment.model.js
│   │   │   ├── vendor-payment-allocation.model.js
│   │   │   ├── vendor-payment.routes.js
│   │   │   ├── vendor-payment.validator.js
│   │   │   └── index.js
│   │   │
│   │   ├── delivery-order/      # Delivery Order Module
│   │   │   ├── delivery-order.controller.js
│   │   │   ├── delivery-order.service.js
│   │   │   ├── delivery-order.repository.js
│   │   │   ├── delivery-order.model.js
│   │   │   ├── delivery-order-item.model.js
│   │   │   ├── delivery-order-document.model.js
│   │   │   ├── delivery-order.routes.js
│   │   │   ├── delivery-order.validator.js
│   │   │   └── index.js
│   │   │
│   │   ├── transmittal/         # Transmittal Form Module
│   │   │   ├── transmittal.controller.js
│   │   │   ├── transmittal.service.js
│   │   │   ├── transmittal.repository.js
│   │   │   ├── transmittal.model.js
│   │   │   ├── transmittal.routes.js
│   │   │   ├── transmittal.validator.js
│   │   │   └── index.js
│   │   │
│   │   ├── customer-invoice/    # Customer Invoice Module
│   │   │   ├── customer-invoice.controller.js
│   │   │   ├── customer-invoice.service.js
│   │   │   ├── customer-invoice.repository.js
│   │   │   ├── customer-invoice.model.js
│   │   │   ├── customer-invoice-item.model.js
│   │   │   ├── customer-invoice.routes.js
│   │   │   ├── customer-invoice.validator.js
│   │   │   └── index.js
│   │   │
│   │   ├── customer-payment/    # Customer Payment Module
│   │   │   ├── customer-payment.controller.js
│   │   │   ├── customer-payment.service.js
│   │   │   ├── customer-payment.repository.js
│   │   │   ├── customer-payment.model.js
│   │   │   ├── customer-payment-allocation.model.js
│   │   │   ├── customer-payment.routes.js
│   │   │   ├── customer-payment.validator.js
│   │   │   └── index.js
│   │   │
│   │   ├── timesheet/           # Timesheet Module
│   │   │   ├── timesheet.controller.js
│   │   │   ├── timesheet.service.js
│   │   │   ├── timesheet.repository.js
│   │   │   ├── timesheet.model.js
│   │   │   ├── timesheet-entry.model.js
│   │   │   ├── timesheet.routes.js
│   │   │   ├── timesheet.validator.js
│   │   │   └── index.js
│   │   │
│   │   ├── attendance/          # Attendance Module
│   │   │   ├── attendance.controller.js
│   │   │   ├── attendance.service.js
│   │   │   ├── attendance.repository.js
│   │   │   ├── attendance.model.js
│   │   │   ├── attendance.routes.js
│   │   │   ├── attendance.validator.js
│   │   │   └── index.js
│   │   │
│   │   ├── rate-card/           # Rate Card Module
│   │   │   ├── rate-card.controller.js
│   │   │   ├── rate-card.service.js
│   │   │   ├── rate-card.repository.js
│   │   │   ├── rate-card.model.js
│   │   │   ├── rate-card.routes.js
│   │   │   ├── rate-card.validator.js
│   │   │   └── index.js
│   │   │
│   │   ├── item/                # Item/Material Module
│   │   │   ├── item.controller.js
│   │   │   ├── item.service.js
│   │   │   ├── item.repository.js
│   │   │   ├── item.model.js
│   │   │   ├── item.routes.js
│   │   │   ├── item.validator.js
│   │   │   └── index.js
│   │   │
│   │   ├── document/            # Document Module
│   │   │   ├── document.controller.js
│   │   │   ├── document.service.js
│   │   │   ├── document.repository.js
│   │   │   ├── document.model.js
│   │   │   ├── document.routes.js
│   │   │   ├── document.validator.js
│   │   │   └── index.js
│   │   │
│   │   ├── communication-log/   # Communication Log Module
│   │   │   ├── communication-log.controller.js
│   │   │   ├── communication-log.service.js
│   │   │   ├── communication-log.repository.js
│   │   │   ├── communication-log.model.js
│   │   │   ├── communication-log.routes.js
│   │   │   ├── communication-log.validator.js
│   │   │   └── index.js
│   │   │
│   │   └── notification/        # Notification Module
│   │       ├── notification.controller.js
│   │       ├── notification.service.js
│   │       ├── notification.repository.js
│   │       ├── notification.model.js
│   │       ├── notification.routes.js
│   │       ├── notification.validator.js
│   │       └── index.js
│   │
│   ├── middlewares/             # Shared middlewares
│   │   ├── auth.middleware.js                 # JWT authentication
│   │   ├── authorization.middleware.js        # Role-based access control
│   │   ├── error-handler.middleware.js        # Global error handler
│   │   ├── validator.middleware.js            # Request validation
│   │   ├── upload.middleware.js               # File upload handling
│   │   ├── logger.middleware.js               # Request logging
│   │   ├── rate-limiter.middleware.js         # Rate limiting
│   │   └── sanitize.middleware.js             # Input sanitization
│   │
│   ├── utils/
│   │   ├── errors/
│   │   │   ├── AppError.js                    # Custom error class
│   │   │   └── errorCodes.js                  # Error code constants
│   │   ├── helpers/
│   │   │   ├── async-handler.js               # Async error wrapper
│   │   │   ├── pagination.js                  # Pagination helper
│   │   │   ├── sorting.js                     # Sorting helper
│   │   │   ├── filtering.js                   # Filtering helper
│   │   │   └── date-helper.js                 # Date utilities
│   │   ├── constants/
│   │   │   ├── status-codes.js                # Status constants
│   │   │   ├── roles.js                       # User roles
│   │   │   ├── permissions.js                 # Permission constants
│   │   │   └── workflow-status.js             # Workflow status constants
│   │   └── lib/
│   │       ├── logger.js                      # Winston logger setup
│   │       ├── encryption.js                  # Encryption utilities
│   │       ├── number-generator.js            # Reference number generator
│   │       ├── workflow.js                    # Workflow state management
│   │       ├── approval.js                    # Approval workflow logic
│   │       ├── email.js                       # Email service
│   │       ├── pdf.js                         # PDF generation
│   │       └── formatters.js                  # Data formatters
│   │
│   ├── migrations/
│   │   ├── 001_initial_schema.js
│   │   ├── 002_add_indexes.js
│   │   └── ...                                # All database migrations
│   │
│   ├── seeds/
│   │   ├── 001_users.js
│   │   ├── 002_organizations.js
│   │   ├── 003_items.js
│   │   └── ...                                # Seed data
│   │
│   ├── jobs/
│   │   ├── email-job.js                       # Email sending job
│   │   ├── notification-job.js                # Notification job (email/SMS)
│   │   ├── reminder-job.js                    # Reminder job
│   │   └── scheduler.js                       # Job scheduler
│   │
│   ├── routes/
│   │   └── index.js                           # Main router (registers all module routes)
│   │
│   ├── app.js                                 # Express app setup
│   └── server.js                              # Server entry point
│
├── tests/
│   ├── unit/
│   │   ├── controllers/
│   │   ├── services/
│   │   └── models/
│   ├── integration/
│   │   ├── api/
│   │   └── workflows/
│   ├── fixtures/
│   │   └── test-data.js
│   └── helpers/
│       └── test-helper.js
│
├── docs/
│   ├── api/
│   │   └── swagger.yaml                       # API documentation
│   └── architecture/
│       └── (this file)
│
├── scripts/
│   ├── migrate.js                             # Migration runner
│   ├── seed.js                                # Seed runner
│   ├── setup.sh                               # Setup script
│   └── deploy.sh                              # Deployment script
│
├── uploads/                                   # File upload directory
│   ├── documents/
│   ├── invoices/
│   └── temp/
│
├── logs/                                      # Application logs
│   ├── error.log
│   ├── combined.log
│   └── access.log
│
├── .env.example                               # Environment variables template
├── .env                                       # Environment variables (gitignored)
├── .gitignore
├── .eslintrc.js                               # ESLint configuration
├── .prettierrc                                # Prettier configuration
├── package.json
├── package-lock.json
├── knexfile.js                                # Knex configuration
├── jest.config.js                             # Jest test configuration
├── Dockerfile
├── docker-compose.yml
├── docker-compose.dev.yml                     # Docker Compose for development
└── README.md
```

---

## Module-Based Architecture

### Module Structure Pattern

Each module is **self-contained** and follows this structure:

```
modules/{module-name}/
├── {module-name}.controller.js    # HTTP request/response handling
├── {module-name}.service.js       # Business logic
├── {module-name}.repository.js    # Database queries (Knex.js)
├── {module-name}.model.js         # Data models/schemas
├── {module-name}.routes.js        # Route definitions
├── {module-name}.validator.js     # Input validation schemas
└── index.js                       # Module exports
```

### Module Components

#### 1. **Controller** (`*.controller.js`)
- Handle HTTP requests and responses
- Validate request parameters using validators
- Call appropriate services
- Return JSON responses
- Handle errors and status codes

**Responsibilities:**
- Request/Response handling
- Input validation delegation
- Service orchestration
- HTTP status code management
- Error handling

#### 2. **Service** (`*.service.js`)
- Business logic implementation
- Database operations (via repository)
- External API integrations
- Complex workflows
- Data transformations
- Business rule enforcement

**Responsibilities:**
- Business logic
- Data processing
- Workflow orchestration
- Integration with external services
- Transaction management

#### 3. **Repository** (`*.repository.js`)
- Database query abstraction
- Knex.js query builders
- Data access methods
- Raw SQL queries (when needed)
- Relationship handling

**Responsibilities:**
- Database queries
- Data access patterns
- Query optimization
- Transaction handling

#### 4. **Model** (`*.model.js`)
- Data structure definitions
- Table schema references
- Data validation rules
- Relationships definitions

**Responsibilities:**
- Data structure
- Schema definitions
- Type definitions
- Relationship mappings

#### 5. **Routes** (`*.routes.js`)
- Define API endpoints for the module
- Route middleware application
- Route parameter parsing
- Request routing to controllers

**Responsibilities:**
- Endpoint definitions
- Route grouping
- Middleware application
- Module-specific routes

#### 6. **Validator** (`*.validator.js`)
- Request validation schemas
- Input sanitization rules
- Validation error messages
- Joi or express-validator schemas

**Responsibilities:**
- Input validation
- Data type checking
- Business rule validation
- Error message formatting

#### 7. **Index** (`index.js`)
- Export all module components
- Public API of the module
- Allow other modules to import

**Example:**
```javascript
// modules/sales-enquiry/index.js
export * from './enquiry.controller'
export * from './enquiry.service'
export * from './enquiry.repository'
export * from './enquiry.model'
export * from './enquiry.routes'
export * from './enquiry.validator'
```

### Shared Components

#### **Middlewares** (`src/middlewares/`)
- Authentication (JWT)
- Authorization (RBAC)
- Error handling
- Request logging
- Rate limiting
- CORS handling
- Request sanitization

**Responsibilities:**
- Request preprocessing
- Security enforcement
- Error catching
- Logging
- Performance monitoring

#### **Utils** (`src/utils/`)
- Shared utilities
- Helper functions
- Constants
- Error classes
- Logger setup
- Number generators
- Workflow helpers
- Email/PDF services

**Responsibilities:**
- Reusable functions
- Common logic
- Constants definition
- Error handling utilities
- Shared services

---

## Key Design Patterns

### 1. **Module Pattern**
- Each module is self-contained
- All related code (controller, service, repository, model, routes, validator) in one place
- Easy to locate and maintain
- Clear module boundaries
- Similar to stance-dashboard architecture

### 2. **MVC Pattern (within modules)**
- **Models**: Data access layer (via Repository)
- **Views**: JSON responses (API)
- **Controllers**: Request handling

### 3. **Service Layer Pattern**
- Business logic separated from controllers
- Reusable business logic
- Testable services
- Services use repositories for data access

### 4. **Repository Pattern**
- Abstract database operations
- Knex.js for query building
- Centralized data access
- Easier to test and maintain

### 5. **Dependency Injection** (Optional - can use simple imports)
- Services injected into controllers
- Repositories injected into services
- Testable architecture
- Can use simple ES6 imports/exports

---

## Database Architecture

### Migration Management
- **Tool**: Knex.js migrations
- **Location**: `src/migrations/`
- **Naming**: `{timestamp}_{description}.js`
- **Version Control**: All migrations in Git

### Seed Data
- **Tool**: Knex.js seeds
- **Location**: `src/seeds/`
- **Purpose**: Initial data, test data, lookup data

### Connection Pooling
- PostgreSQL connection pool configuration
- Environment-based connection settings
- Health check endpoints

---

## Security Architecture

### Authentication
- JWT (JSON Web Tokens)
- Token expiration
- Refresh token mechanism
- Password hashing (bcrypt)

### Authorization
- Role-Based Access Control (RBAC)
- Permission-based access
- Route-level authorization
- Resource-level authorization

### Data Security
- Input sanitization
- SQL injection prevention (parameterized queries)
- XSS protection
- CSRF protection
- Rate limiting
- Helmet.js for security headers

---

## API Design Principles

### RESTful API
- Resource-based URLs
- HTTP methods (GET, POST, PUT, PATCH, DELETE)
- Status codes (200, 201, 400, 401, 403, 404, 500)
- JSON responses

### API Versioning
- URL versioning: `/api/v1/...`
- Header versioning (optional)

### Response Format
```json
{
  "success": true,
  "data": { ... },
  "message": "Success message",
  "meta": {
    "pagination": { ... },
    "timestamp": "2024-01-01T00:00:00Z"
  }
}
```

### Error Format
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message",
    "details": { ... }
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

---

## Error Handling

### Error Types
- **Validation Errors**: 400 Bad Request
- **Authentication Errors**: 401 Unauthorized
- **Authorization Errors**: 403 Forbidden
- **Not Found Errors**: 404 Not Found
- **Conflict Errors**: 409 Conflict
- **Server Errors**: 500 Internal Server Error

### Error Handling Strategy
- Centralized error handler middleware
- Custom error classes
- Error logging
- User-friendly error messages
- Development vs Production error details

---

## Logging Architecture

### Log Levels
- **Error**: Error logs
- **Warn**: Warning logs
- **Info**: Information logs
- **Debug**: Debug logs (development only)

### Log Destinations
- Console (development)
- File (production)
- External logging service (optional)

### Logging Areas
- HTTP requests/responses
- Database queries (optional)
- Business logic errors
- Security events
- Performance metrics

---

## Testing Strategy

### Test Types
- **Unit Tests**: Services, utilities, helpers
- **Integration Tests**: API endpoints, workflows
- **E2E Tests**: Complete workflows (optional)

### Test Structure
- Test files: `*.test.js` or `*.spec.js`
- Test fixtures for sample data
- Test helpers for common operations
- Mock database for unit tests

---

## Deployment Architecture

### Environment Configuration
- Development
- Staging
- Production

### Containerization
- Docker for containerization
- Docker Compose for local development
- Multi-stage builds for optimization

---

## Performance Considerations

### Database Optimization
- Indexed queries
- Connection pooling
- Query optimization
- Caching (Redis - optional)

### API Optimization
- Response compression
- Pagination
- Filtering and sorting
- Field selection (optional)

### Monitoring
- Health check endpoints
- Performance metrics
- Error tracking
- Resource usage monitoring

---

## Development Workflow

### Code Quality
- ESLint for linting
- Prettier for formatting
- Pre-commit hooks (optional)
- Code review process

### Version Control
- Git for version control
- Branch strategy (Git Flow)
- Commit message conventions
- PR review process

---

## Next Steps

1. **Setup Project Structure**: Create all folders
2. **Initialize Package.json**: Install dependencies
3. **Setup Database**: Configure PostgreSQL connection
4. **Setup Knex**: Configure migrations and seeds
5. **Implement Base Structure**: Controllers, Services, Models
6. **Setup Middlewares**: Auth, Error handling, Validation
7. **Implement Core Modules**: Start with Auth, then Sales, Projects, etc.
8. **Testing**: Setup testing framework
9. **Documentation**: API documentation with Swagger
10. **Deployment**: Docker setup and deployment scripts

---

This architecture provides a solid, scalable, and maintainable foundation for the TOM backend system.
