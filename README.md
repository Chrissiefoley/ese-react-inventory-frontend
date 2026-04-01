# ESE Inventory Frontend

> TypeScript-based React inventory management interface with JWT authentication and role-based access control

## 📋 Table of Contents

- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Key Features](#key-features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [Testing](#testing)
- [Security](#security)
- [Technical Decisions](#technical-decisions)
- [AI Statement](#ai-statement)

---

## 🏗 Architecture

### System Overview

```
Frontend (React + TypeScript)
     ↓ REST API calls (Axios + JWT cookies)
Backend (Django REST Framework)
     ↓ ORM queries
Database (SQLite - development)
```

**Component Hierarchy:**
```
App.tsx (Router + Auth State Management)
├── HomePage (Main layout with SideMenu + Inventory)
│   ├── SideMenu (Category navigation)
│   └── InventoryPage (Table view with CRUD operations)
├── AddProductPage (Product creation form)
├── Profile Pages
│   ├── LoginPage (JWT authentication)
│   ├── RegistrationPage (Staff verification)
│   └── UserProfile (Avatar + contact info editing)
└── Shared Components
    └── ImageUpload (Cloudinary integration)
```

### Design Patterns
- **Centralized type definitions** - Single source of truth (`types/index.ts`) for all interfaces
- **API service layer** - Separate modules for auth, inventory, users for better organisation
- **Co-located tests** - Test files alongside implementation files for easier maintenance
- **Role-based rendering** - Conditional UI based on `is_staff_verified` flag for security

---

## Tech Stack

- **React 18.3.1** with **TypeScript 4.x**
- **Material-UI 6.x** - Enterprise component library
- **Axios** - HTTP client with credential support
- **React Router v6** - Client-side routing
- **Jest + React Testing Library** - Unit and integration testing
- **Cloudinary** - Image hosting and upload

---

## ✨ Key Features

### Authentication & Authorization
- JWT cookie-based authentication 
- Staff table verification during registration
- Role-based UI rendering (verified vs unverified users)
- Session expiration handling

### Inventory Management
- **CRUD operations** - Create, read, update, delete items
- **Category filtering** - Sidebar navigation with preset categories for quick access
- **Image uploads** - Cloudinary integration for product images
- **Low stock warnings** - Visual alerts when count < 10
- **Category dropdown** - Shows existing categories + "Add new" option for custom categories

### User Profile
- Avatar upload and management
- Contact information editing

---

##  Getting Started

### Prerequisites
```bash
node --version  # v18.20.4 or higher
npm --version   # v10.8.3 or higher
```

### Installation
```bash
# Install dependencies
npm install

# Verify installation
npm run build
```

### Environment Setup

Create `.env` in project root:
```env
REACT_APP_CLOUDINARY_CLOUD_NAME=your-cloud-name
REACT_APP_CLOUDINARY_UPLOAD_PRESET=your-preset-name
```

**Backend Connection:**
The app expects the Django backend at `http://localhost:8000/api` (configured in `src/api/client.ts`)

### Run Development Server
```bash
npm start
```
Opens at **http://localhost:3000**

**First-time Setup:**
1. Ensure Django backend is running on port 8000
2. Register a new user (requires matching Staff table record)
3. Admin must verify account via Django admin panel
4. Login and access inventory dashboard

---

## 📂 Project Structure

```
src/
├── api/                      # API service layer
│   ├── client.ts            # Axios configuration
│   ├── auth.ts              # Login, register, logout
│   ├── inventory.ts         # Item CRUD operations
│   └── users.ts             # Profile management
├── components/              # Reusable components
│   ├── ImageUpload.tsx      # Cloudinary upload widget
│   ├── InventoryCard.tsx    # Card view (legacy)
│   └── SideMenu.tsx         # Category navigation
├── pages/                   # Route-level pages
│   ├── HomePage/            # Main dashboard layout
│   ├── InventoryDashboard/  # Inventory table + add product
│   └── Profile/             # Auth + user profile pages
├── types/                   # TypeScript definitions
│   └── index.ts             # Centralized interfaces
├── utils/                   # Helper functions
│   ├── inventory.ts         # Inventory utilities
│   ├── inventory.test.ts    # Unit tests
│   ├── validation.ts        # Password validation
│   └── validation.test.ts   # Unit tests
├── App.tsx                  # Root component with routing
├── index.tsx                # Entry point
└── setupTests.ts            # Jest configuration
```
---

## API Integration

### Axios Client Configuration
```typescript
// src/api/client.ts
export const apiClient = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,  // Required for JWT cookie transmission
  headers: {
    "Content-Type": "application/json",
  },
});
```

### API Endpoints

**Authentication:**
- `POST /auth/register/` - Create new user (requires Staff verification)
- `POST /auth/login/` - Login with username/password
- `POST /auth/logout/` - Invalidate JWT tokens
- `GET /auth/me/` - Get current user details

**Inventory:**
- `GET /items/` - List all inventory items
- `POST /items/` - Create new item
- `PATCH /items/:id/` - Update item (partial)
- `DELETE /items/:id/` - Remove item

**User Profile:**
- `GET /auth/me/` - Fetch user + UserInfo
- `PATCH /auth/me/` - Update avatar or contact_info


---

## Testing

### Test Coverage

**24 Tests Passing**

**Unit Tests:**
- `utils/validation.test.ts` - Password strength validation 
- `utils/inventory.test.ts` - Stock level checks, price formatting 

**Integration Tests:**
- `LoginPage.test.tsx` - Form rendering, validation
- `RegistrationPage.test.tsx` - Multi-step registration flow
- `InventoryPage.test.tsx` - Table rendering, role-based UI

### Run Tests
```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test -- LoginPage.test.ts
```

---

## Security

### JWT Cookie Authentication

**Client-Side Implementation:**
```typescript
// Cookies are set by backend, automatically sent by browser
const apiClient = axios.create({
  withCredentials: true,  // Critical setting
});
```

**Security Properties:**
- **httponly flag** - Prevents XSS theft
- **secure flag** - Only transmitted over HTTPS in production
- **samesite=Lax** - Prevents CSRF attacks from external sites
- **max_age** - Tokens expire after 2 hours (access) / 7 days (refresh)

---


### UI Design Choice 

The project uses Material-UI component library for consistent and accessible UI components, with some custom css for specific styling needs.

---

## AI Statement

### Use of Generative AI Tools

This project was developed with assistance from **Claude Code (Anthropic)/ Windsurf** as a learning and development aid. AI tools were used throughout the development process, primarily for learning and understanding complex concepts and styling improvements, and helping with debugging and migration from JavaScript to TypeScript. Finally, documentation was enhanced using AI assistance.
It should be noted that all code was reviewed, clarified and understood before being committed.

Through video submission, details of code, architecture and concept implementation is proven. 

---

**Project Repository:** (https://github.com/Chrissiefoley/ese-react-inventory-frontend.git)
**Backend Repository:** [ese-django-inventory-backend](https://github.com/Chrissiefoley/ese-django-inventory-backend.git)
