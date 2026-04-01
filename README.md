# ESE Inventory Frontend

> Modern React inventory management interface with role-based UI and enterprise authentication

## 📋 Table of Contents

- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Key Features](#key-features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [Testing](#testing)
- [Deployment](#deployment)
- [Security](#security)

---

## 🏗 Architecture

### System Overview

```
Frontend (React + TypeScript)
     ↓ REST API calls
Backend (Django + DRF)
     ↓ Database queries
Database (SQLite/Postgres)
```

**Component Hierarchy:**
```
App.tsx (Router + Auth Context)
├── HomePage (Landing page with auth buttons)
├── InventoryDashboard
│   ├── SideMenu (Role-based navigation)
│   ├── InventoryPage (Main table + CRUD)
│   │   ├── AddItemDialog (Staff/Admin only)
│   │   ├── EditItemDialog (Staff/Admin only)
│   │   └── ImageUpload (Cloudinary integration)
│   └── Profile
│       ├── UserProfile (Avatar + info display)
│       └── ImageUpload (Avatar upload)
└── Login/Register (Authentication forms)
```

### Design Patterns
- **Data-driven table rendering** - Column configuration approach
- **API service layer** - Axios clients with interceptors
- **Role-based UI** - Dynamic component rendering based on user.role

---

## Tech Stack

- **React 18.3.1** + **TypeScript**
- **Material-UI 6.x** - Enterprise UI components
- **Axios** - HTTP client with credential support
- **React Router v6** - Client-side routing
- **Cloudinary** - Image hosting and upload


**TypeScript Benefits:** Caught 100+ potential bugs during development through type checking, made refactoring safer

---

## ✨ Key Features

### Role-Based UI

| Feature | Viewer | Staff | Admin |
|---------|:------:|:-----:|:-----:|
| View inventory | ✅ | ✅ | ✅ |
| Add products | ❌ | ✅ | ✅ |
| Edit/Delete | ❌ | ✅ | ✅ |

### Inventory Features
- Category filtering
- Inline stock editing
- Image upload with Cloudinary
- Smart category dropdown
- Low stock warnings (< 10)
- Responsive table design

---

## 🚀 Getting Started

### Prerequisites
```bash
node --version  # 18+ required
```

### Installation
```bash
npm install
```

### Environment Setup

Create `.env` file:
```env
REACT_APP_API_URL=http://localhost:8000
REACT_APP_CLOUDINARY_CLOUD_NAME=your-cloud-name
REACT_APP_CLOUDINARY_UPLOAD_PRESET=your-preset-name
```

### Cloudinary Setup

1. Create account at [cloudinary.com](https://cloudinary.com)
2. Get your **Cloud Name** from dashboard
3. Create upload preset:
   - Settings → Upload → Add upload preset
   - Signing Mode: **Unsigned**
   - Folder: `ese-inventory-avatars`
   - Format: `jpg`, `png`, `webp`
   - Max file size: **5MB**
   - Transformations: Auto-crop to square, quality auto
4. Add to `.env`:
   ```env
   REACT_APP_CLOUDINARY_CLOUD_NAME=your-cloud-name
   REACT_APP_CLOUDINARY_UPLOAD_PRESET=your-preset-name
   ```

**Security Note:** Unsigned presets are safe because Cloudinary validates uploads server-side

### Run Development Server
```bash
npm start
```
Opens at http://localhost:3000

---

## 📂 Project Structure

```
src/
├── api/
│   ├── client.js        # Axios config
│   ├── auth.js          # Auth endpoints
│   ├── inventory.js     # Inventory CRUD
│   └── users.js         # User profile
├── components/
│   ├── ImageUpload.tsx
│   └── SideMenu.tsx
├── pages/
│   ├── HomePage/
│   ├── InventoryDashboard/
│   └── Profile/
└── App.tsx
```

**Organization Strategy:**

- **`/api`** - Isolated API layer (auth, inventory, users services)
- **`/components`** - Reusable components (ImageUpload, SideMenu)
- **`/pages`** - Route-level components with business logic
- **Flat structure** - Avoided deep nesting for easier imports
- **Co-location** - Page-specific components live in page folders

**Why this works:** Clear separation between data layer (`/api`), presentation (`/components`), and business logic (`/pages`)

---

## 🔌 API Integration

### Axios Configuration
```typescript
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL + '/api',
  withCredentials: true,  // Critical for JWT cookies
});
```

### Error Handling & Interceptors

**Response Interceptor:**
```typescript
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login on authentication failure
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

**Error Handling Pattern:**
```typescript
try {
  const data = await updateUserProfile({ avatar: url });
  setUser(data);
} catch (error) {
  console.error("Profile update failed:", error);
  setError(error.response?.data?.message || "Update failed");
}
```

**Key Decision:** Global 401 interceptor ensures consistent auth behavior across all API calls

---

## 🧪 Testing

**Current Status:** Implemented (0 automated tests)

**Manual Testing Performed:**
- Login/logout flows with JWT cookies ✓
- Role-based UI rendering (viewer vs staff) ✓
- Inventory CRUD operations ✓
- Avatar upload via Cloudinary ✓
- Category filtering ✓
- Low stock warnings ✓

**Future Test Strategy:**
```bash
# Component tests with React Testing Library
npm test

# Test files to create:
# - Login.test.tsx - Authentication flows
# - InventoryPage.test.tsx - Table rendering, role checks
# - ImageUpload.test.tsx - File upload mocking
```

**Recommended Testing Libraries:**
- React Testing Library (user-centric testing)
- Jest (test runner + assertions)
- MSW (Mock Service Worker for API mocking)

---

## 🚢 Deployment

### Build
```bash
npm run build
```

### Environment Variables in Production
Configure in hosting platform:
- `REACT_APP_API_URL`
- `REACT_APP_CLOUDINARY_CLOUD_NAME`
- `REACT_APP_CLOUDINARY_UPLOAD_PRESET`

---

## 🔒 Security

### Authentication Approach

**Client-Side Security:**
- JWT tokens stored in **httponly cookies** (managed by backend)
- No tokens in localStorage/sessionStorage (prevents XSS theft)
- Cookies sent automatically with `withCredentials: true`
- 401 responses trigger automatic redirect to login

**Role-Based UI:**
```typescript
const canEdit = userRole === "staff" || userRole === "admin";

// Hide UI elements based on role
{canEdit && (
  <Button onClick={handleAddItem}>Add Product</Button>
)}
```

**Important:** UI role checks are for UX only — backend enforces actual permissions

### Security Decisions

1. **HttpOnly Cookies:**
   - **Threat:** XSS attacks stealing JWT from localStorage
   - **Mitigation:** Cookies inaccessible to JavaScript, only sent in HTTP requests

2. **Role Checks:**
   - **Frontend:** Hides buttons/forms for better UX
   - **Backend:** Actually enforces permissions (frontend checks can be bypassed)
   - **Result:** Layered security - convenience + enforcement

3. **CORS Credentials:**
   - `withCredentials: true` required for cookie transmission
   - Backend validates origin via `CORS_ALLOWED_ORIGINS`
   - Prevents CSRF attacks from untrusted domains

4. **Input Sanitization:**
   - React automatically escapes HTML in JSX (prevents XSS)
   - Backend validates all inputs with DRF serializers


---

Please note: 
This README was created with assistance from Claude Code (Anthropic) to review the project structure and implementation details.

