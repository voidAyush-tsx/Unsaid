# Unsaid - Complete Project Documentation

**Version:** 0.1.0  
**Last Updated:** December 25, 2025  
**Framework:** Next.js 15.5.8 with TypeScript  
**Database:** PostgreSQL with Prisma ORM

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Folder Structure](#folder-structure)
4. [API Documentation](#api-documentation)
5. [Database Schema](#database-schema)
6. [Coding Practices & Standards](#coding-practices--standards)
7. [Authentication & Authorization](#authentication--authorization)
8. [Component Architecture](#component-architecture)
9. [Development Setup](#development-setup)
10. [Deployment & Build](#deployment--build)

---

## Project Overview

**Unsaid** is a comprehensive web application built with Next.js that facilitates mental health counseling, user assessments, and real-time communication. The platform supports multiple user roles (Admin, Counsellor, User) with specialized features for each.

### Key Features
- **User Authentication**: NextAuth.js with credentials provider and JWT strategy
- **Role-Based Access Control**: Admin, Counsellor, and User roles with specific permissions
- **Real-Time Messaging**: Socket.io integration for live chat between users and counsellors
- **Assessment Tools**: GAD-7, CALM Space, and other psychological assessment tests
- **Admin Dashboard**: Comprehensive user management, chat history, and contact message tracking
- **User Assignments**: Match patients with counsellors and track assignments
- **Contact Management**: Collect and manage contact messages from visitors
- **Activity Tracking**: Monitor user online/offline status and last active timestamps

---

## Tech Stack

### Core Framework
- **Next.js** (15.5.8): React framework with server-side rendering and API routes
- **React** (19.1.0): UI component library
- **TypeScript** (5): Strict type safety for JavaScript

### Database & ORM
- **PostgreSQL**: Relational database
- **Prisma** (5.7.0): Modern ORM for database operations
- **pg** (8.11.2): PostgreSQL client for Node.js

### Authentication & Security
- **NextAuth.js** (4.22.1): Authentication solution with JWT strategy
- **bcryptjs** (2.4.3): Password hashing and verification
- **@next-auth/prisma-adapter**: Prisma adapter for NextAuth.js

### Real-Time Communication
- **Socket.io** (4.8.1): Server-side WebSocket library
- **socket.io-client** (4.8.2): Client-side WebSocket library

### UI & Styling
- **TailwindCSS** (4): Utility-first CSS framework
- **Framer Motion** (12.23.12): Animation library
- **GSAP** (3.13.0): Advanced animation library
- **Lucide React** (0.548.0): Icon library

### Additional Libraries
- **Firebase** (12.1.0): Potential alternative authentication/services
- **dompurify** (3.2.6): XSS sanitization
- **xlsx** (0.18.5): Excel file parsing for bulk user upload
- **Vercel Analytics** (1.5.0): Analytics tracking

### Development Tools
- **ESLint** (9): Code linting
- **Turbopack**: Fast bundler for development
- **TSX**: TypeScript execution in Node.js

---

## Folder Structure

```
unsaid/
├── src/
│   ├── app/                           # Next.js app directory (App Router)
│   │   ├── api/                       # API routes (backend)
│   │   │   ├── activity/              # Activity tracking endpoints
│   │   │   ├── admin/                 # Admin-only endpoints
│   │   │   │   ├── chat-history/      # Admin chat history retrieval
│   │   │   │   ├── contact-messages/  # Manage contact form submissions
│   │   │   │   ├── upload-users/      # Bulk user upload from Excel
│   │   │   │   └── users/             # User management (CRUD)
│   │   │   ├── assessment/            # Assessment endpoints
│   │   │   ├── assignments/           # Patient-Counsellor assignments
│   │   │   ├── auth/                  # Authentication
│   │   │   │   ├── [...nextauth]/     # NextAuth.js dynamic route
│   │   │   │   ├── change-password/   # Password change endpoint
│   │   │   │   └── signup/            # User registration
│   │   │   ├── chat/                  # Chat messaging (WebSocket + HTTP fallback)
│   │   │   ├── contact/               # Contact form submission
│   │   │   ├── socket/                # WebSocket/Socket.io server
│   │   │   └── user/                  # User-specific endpoints
│   │   │       └── profile/           # User profile management
│   │   ├── auth/
│   │   │   ├── change-password/       # Change password page
│   │   │   └── signin/                # Sign-in page
│   │   │   └── signup/                # Sign-up page
│   │   ├── about/                     # About page
│   │   ├── account/                   # User account settings
│   │   ├── admin/                     # Admin dashboard
│   │   ├── assessment/                # Assessment page
│   │   ├── connect/                   # Main user dashboard/connection page
│   │   ├── counsellor/                # Counsellor-specific view
│   │   ├── dashboard/                 # Dashboard (role-specific)
│   │   ├── get_in_touch/              # Contact us page
│   │   ├── privacy/                   # Privacy policy page
│   │   ├── 404.tsx                    # 404 error page
│   │   ├── layout.tsx                 # Root layout component
│   │   ├── not-found.tsx              # Not found handler
│   │   ├── page.tsx                   # Home page
│   │   └── globals.css                # Global styles
│   │
│   ├── components/                    # Reusable React components
│   │   ├── auth/                      # Authentication components
│   │   │   ├── LoginForm.tsx          # Login form component
│   │   │   ├── ChangePasswordForm.tsx # Password change form
│   │   │   └── ...
│   │   ├── assessment/                # Assessment UI components
│   │   │   ├── GADTest.tsx            # GAD-7 assessment
│   │   │   ├── CalmSpace.tsx          # CALM Space assessment
│   │   │   └── ...
│   │   ├── about/                     # About page components
│   │   │   └── counsellor_grid.tsx    # Counsellor grid display
│   │   ├── connect/                   # Connect page components
│   │   ├── GetInTouch/                # Contact form components
│   │   ├── AdminUserList.tsx          # Admin user management
│   │   ├── AdminAssignments.tsx       # Admin assignment management
│   │   ├── AdminChatHistory.tsx       # Admin chat history viewer
│   │   ├── AdminContactMessages.tsx   # Admin contact message viewer
│   │   ├── AdminUserUpload.tsx        # Bulk user upload component
│   │   ├── ActivityTester.tsx         # Activity/status testing
│   │   ├── ChatWidget.tsx             # Chat UI component
│   │   ├── CounsellorDashboard.tsx    # Counsellor view
│   │   ├── ClientProviders.tsx        # Client-side providers setup
│   │   ├── PresenceTracker.tsx        # User presence/online status
│   │   ├── RequestCounsellor.tsx      # Request counsellor form
│   │   ├── features.tsx               # Features showcase
│   │   ├── getInTouch.tsx             # Contact page component
│   │   ├── navBar_v1.tsx              # Navigation bar version 1
│   │   ├── navBar_v2.tsx              # Navigation bar version 2
│   │   ├── footer_v1.tsx              # Footer version 1
│   │   ├── footer_v2.tsx              # Footer version 2
│   │   └── MenuButton.module.css      # Menu button styles
│   │
│   ├── contexts/                      # React Context for state management
│   │   └── AuthContext.tsx            # Authentication context
│   │
│   ├── hooks/                         # Custom React hooks
│   │   └── useAuth.ts                 # Custom auth hook
│   │
│   ├── lib/                           # Utility functions & configurations
│   │   ├── auth.ts                    # NextAuth configuration
│   │   ├── prisma.ts                  # Prisma client singleton
│   │   ├── socket.ts                  # Socket.io utilities
│   │   └── firebase.ts                # Firebase configuration
│   │
│   ├── types/                         # TypeScript type definitions
│   │   ├── next-auth.d.ts             # NextAuth type augmentation
│   │   └── bcryptjs.d.ts              # bcryptjs type definitions
│   │
│   ├── services/                      # Business logic & external service calls
│   │
│   └── pages/                         # Legacy pages (if any)
│       └── api/                       # Legacy API routes
│
├── prisma/                            # Prisma ORM configuration
│   ├── schema.prisma                  # Database schema definition
│   └── migrations/                    # Database migration history
│       ├── migration_lock.toml        # Migration lock file
│       └── [migration_folders]/       # Individual migration folders with .sql files
│
├── public/                            # Static assets
│   ├── about/                         # About page assets
│   ├── assessment/                    # Assessment images/icons
│   ├── auth/                          # Auth page assets
│   ├── connect/                       # Connect page assets
│   │   ├── grid_assets/               # Grid layout assets
│   │   └── mode_counselling/          # Counselling mode assets
│   ├── counsellors/                   # Counsellor profiles/images
│   ├── features/                      # Feature showcase images
│   ├── footer/                        # Footer assets
│   ├── getInTouch/                    # Contact page assets
│   ├── healthJourney/                 # Health journey graphics
│   │   └── circle_icons/              # Circular icons
│   ├── home/                          # Home page assets
│   └── navBar/                        # Navigation assets
│
├── scripts/                           # Utility scripts
│   └── seedUsers.mjs                  # Database seeding script
│
├── Configuration Files
│   ├── .env.local                     # Environment variables (local)
│   ├── docker-compose.yml             # Docker Compose for PostgreSQL
│   ├── Dockerfile                     # Docker configuration
│   ├── package.json                   # Dependencies & scripts
│   ├── tsconfig.json                  # TypeScript configuration
│   ├── next.config.ts                 # Next.js configuration
│   ├── eslint.config.mjs              # ESLint rules
│   ├── postcss.config.mjs             # PostCSS configuration
│   └── tailwind.config.ts             # TailwindCSS configuration
│
├── README.md                          # Project README
└── DOCUMENTATION.md                   # This file

```

### Key Directory Patterns

**API Routes Pattern:**
- Located in `src/app/api/[feature]/route.ts`
- Each feature has its own folder with `route.ts` exporting HTTP methods (GET, POST, PATCH, DELETE)
- Dynamic routes use `[...nextauth]` for routing

**Components Pattern:**
- Organized by feature/page
- Shared components at root of `components/`
- Feature-specific components in their own subdirectories

**Hooks Pattern:**
- Custom hooks in `src/hooks/`
- Named with `use` prefix (e.g., `useAuth.ts`)

**Context Pattern:**
- Global state in `src/contexts/`
- Usually with corresponding hooks for easy consumption

---

## API Documentation

### Authentication Endpoints

#### `/api/auth/[...nextauth]`
**Type:** NextAuth.js dynamic route  
**Handler:** `src/app/api/auth/[...nextauth]/route.ts`

Handles all authentication flows:
- Sign-in with credentials
- JWT token generation and refresh
- Session management

**Configuration:** `src/lib/auth.ts`

```typescript
// Key config options:
- Provider: CredentialsProvider
- Strategy: JWT
- Adapter: PrismaAdapter
- Session expires: Based on NEXTAUTH_SECRET
```

---

#### `/api/auth/signup`
**Method:** POST  
**Auth Required:** No  
**Purpose:** User registration

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword",
  "name": "User Name"
}
```

**Response:**
```json
{
  "user": {
    "id": "cuid",
    "email": "user@example.com",
    "name": "User Name",
    "role": "USER"
  }
}
```

**Validation:**
- Email must be unique
- Password must meet security requirements
- Email format validation

---

#### `/api/auth/change-password`
**Method:** POST  
**Auth Required:** Yes (Session required)  
**Purpose:** Change user password

**Request Body:**
```json
{
  "currentPassword": "oldPassword",
  "newPassword": "newPassword",
  "confirmPassword": "newPassword"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

---

### User Endpoints

#### `/api/user/profile`
**Method:** PATCH  
**Auth Required:** Yes  
**Purpose:** Update user profile

**Request Body:**
```json
{
  "name": "Updated Name"
}
```

**Response:**
```json
{
  "user": {
    "id": "cuid",
    "email": "user@example.com",
    "name": "Updated Name",
    "role": "USER",
    "createdAt": "2025-12-25T00:00:00Z"
  }
}
```

---

#### `/api/user/assessments`
**Method:** GET  
**Auth Required:** Yes  
**Purpose:** Get user's assessment history

**Query Parameters:**
- `type` (optional): Filter by assessment type (e.g., "GAD-7")
- `limit` (optional): Number of results (default: 10)

**Response:**
```json
{
  "assessments": [
    {
      "id": "cuid",
      "type": "GAD-7",
      "score": 12,
      "level": "Mild anxiety",
      "createdAt": "2025-12-25T00:00:00Z"
    }
  ]
}
```

---

### Contact Endpoints

#### `/api/contact`
**Method:** POST  
**Auth Required:** No  
**Purpose:** Submit contact form

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "occupation": "Engineer",
  "phone": "+1234567890",
  "message": "I would like to reach out..."
}
```

**Validation:**
- `name` (required)
- `email` (required, valid email format)
- `message` (required)
- `occupation`, `phone` (optional)

**Response:**
```json
{
  "success": true,
  "id": "cuid"
}
```

**Error Responses:**
```json
{ "error": "Missing required fields", "status": 400 }
{ "error": "Invalid email format", "status": 400 }
{ "error": "Internal Server Error", "status": 500 }
```

---

### Chat Endpoints

#### `/api/chat`
**Method:** GET  
**Auth Required:** Yes  
**Purpose:** Retrieve chat message history

**Query Parameters:**
- `room` (required): Chat room identifier (e.g., "private-chat-counsellorId-patientId")

**Response:**
```json
{
  "messages": [
    {
      "text": "Hello",
      "ts": 1703520000000,
      "sender": "user@example.com",
      "senderId": "cuid"
    }
  ]
}
```

**Security:**
- Users can only access their own private chats
- Admins can access all chat histories

---

### Assessment Endpoints

#### `/api/assessment/submit`
**Method:** POST  
**Auth Required:** Yes  
**Purpose:** Submit assessment results

**Request Body:**
```json
{
  "type": "GAD-7",
  "score": 12,
  "level": "Mild anxiety"
}
```

**Response:**
```json
{
  "success": true,
  "assessmentResult": {
    "id": "cuid",
    "userId": "cuid",
    "type": "GAD-7",
    "score": 12,
    "level": "Mild anxiety",
    "createdAt": "2025-12-25T00:00:00Z"
  }
}
```

---

### Assignment Endpoints

#### `/api/assignments`
**Method:** GET  
**Auth Required:** Yes  
**Purpose:** Get user assignments (patient or counsellor)

**Response:**
```json
{
  "assignments": [
    {
      "id": "cuid",
      "patientId": "cuid",
      "counsellorId": "cuid",
      "assignedAt": "2025-12-25T00:00:00Z",
      "isActive": true,
      "patient": { "id": "cuid", "name": "Patient Name", "email": "..." },
      "counsellor": { "id": "cuid", "name": "Counsellor Name", "email": "..." }
    }
  ]
}
```

---

#### `/api/assignments`
**Method:** POST  
**Auth Required:** Yes (Admin or Counsellor)  
**Purpose:** Create patient-counsellor assignment

**Request Body:**
```json
{
  "patientId": "cuid",
  "counsellorId": "cuid"
}
```

**Response:**
```json
{
  "assignment": {
    "id": "cuid",
    "patientId": "cuid",
    "counsellorId": "cuid",
    "assignedAt": "2025-12-25T00:00:00Z",
    "isActive": true
  }
}
```

---

### Admin Endpoints

#### `/api/admin/users`
**Method:** GET  
**Auth Required:** Yes (Admin only)  
**Purpose:** List all users

**Response:**
```json
{
  "users": [
    {
      "id": "cuid",
      "email": "user@example.com",
      "name": "User Name",
      "role": "USER",
      "createdAt": "2025-12-25T00:00:00Z"
    }
  ]
}
```

---

#### `/api/admin/users`
**Method:** POST  
**Auth Required:** Yes (Admin only)  
**Purpose:** Create new user

**Request Body:**
```json
{
  "email": "newuser@example.com",
  "password": "securePassword",
  "name": "New User",
  "role": "USER"
}
```

**Role Validation:** `ADMIN`, `COUNSELLOR`, `USER`

**Response:**
```json
{
  "user": {
    "id": "cuid",
    "email": "newuser@example.com",
    "name": "New User",
    "role": "USER"
  }
}
```

---

#### `/api/admin/users/[userId]`
**Method:** PATCH  
**Auth Required:** Yes (Admin only)  
**Purpose:** Update user details

**Request Body:**
```json
{
  "name": "Updated Name",
  "role": "COUNSELLOR"
}
```

---

#### `/api/admin/users/[userId]`
**Method:** DELETE  
**Auth Required:** Yes (Admin only)  
**Purpose:** Delete user

**Response:**
```json
{
  "success": true,
  "message": "User deleted"
}
```

---

#### `/api/admin/upload-users`
**Method:** POST  
**Auth Required:** Yes (Admin only)  
**Purpose:** Bulk upload users from Excel file

**Request:** Form data with Excel file

**Response:**
```json
{
  "success": true,
  "imported": 15,
  "failed": 0,
  "errors": []
}
```

---

#### `/api/admin/chat-history`
**Method:** GET  
**Auth Required:** Yes (Admin only)  
**Purpose:** Retrieve all chat messages

**Query Parameters:**
- `limit` (optional): Number of messages
- `offset` (optional): Pagination offset

**Response:**
```json
{
  "messages": [
    {
      "id": "cuid",
      "room": "private-chat-...",
      "senderId": "cuid",
      "sender": "user@example.com",
      "message": "Chat message",
      "timestamp": "2025-12-25T00:00:00Z"
    }
  ]
}
```

---

#### `/api/admin/contact-messages`
**Method:** GET  
**Auth Required:** Yes (Admin only)  
**Purpose:** Get all contact form submissions

**Response:**
```json
{
  "messages": [
    {
      "id": "cuid",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "occupation": "Engineer",
      "message": "Message content",
      "createdAt": "2025-12-25T00:00:00Z",
      "isRead": false
    }
  ]
}
```

---

#### `/api/admin/contact-messages/[messageId]`
**Method:** PATCH  
**Auth Required:** Yes (Admin only)  
**Purpose:** Mark contact message as read

**Request Body:**
```json
{
  "isRead": true
}
```

---

### Activity Endpoints

#### `/api/activity`
**Method:** POST  
**Auth Required:** Yes  
**Purpose:** Track user activity (online/offline status)

**Request Body:**
```json
{
  "status": "online|offline",
  "lastActive": "2025-12-25T00:00:00Z"
}
```

---

### Socket.io Events

**Namespace:** `/` (root namespace)

#### Client to Server Events

**`join-room`**
```javascript
socket.emit('join-room', { 
  room: 'private-chat-counsellorId-patientId',
  userId: 'cuid',
  userName: 'User Name'
});
```

**`send-message`**
```javascript
socket.emit('send-message', { 
  room: 'private-chat-...',
  message: 'Message text',
  sender: 'user@example.com'
});
```

**`user-online`**
```javascript
socket.emit('user-online', { userId: 'cuid' });
```

**`user-offline`**
```javascript
socket.emit('user-offline', { userId: 'cuid' });
```

#### Server to Client Events

**`receive-message`**
```javascript
socket.on('receive-message', { 
  text: 'Message text',
  ts: 1703520000000,
  sender: 'user@example.com',
  senderId: 'cuid'
});
```

**`user-joined`**
```javascript
socket.on('user-joined', { 
  userId: 'cuid',
  userName: 'User Name'
});
```

**`user-left`**
```javascript
socket.on('user-left', { userId: 'cuid' });
```

---

## Database Schema

### Overview

The application uses PostgreSQL with Prisma ORM. The database consists of the following core models:

```
User (1:N) -> Account
User (1:N) -> Session
User (1:N) -> AssessmentResult
User (1:N) -> Assignment (as patient)
User (1:N) -> Assignment (as counsellor)
Assignment (N:1) -> User (patient)
Assignment (N:1) -> User (counsellor)
ChatMessage (no relations - indexed for performance)
ContactMessage (no relations - independent records)
```

### Models

#### **User Model**
Represents a user in the system with authentication and role-based access.

```prisma
model User {
  id                String          @id @default(cuid())
  name              String?
  email             String?         @unique
  hashedPassword    String?
  emailVerified     DateTime?
  image             String?
  role              Role            @default(USER)
  mustChangePassword Boolean        @default(false)
  lastActive        DateTime?       // Track online/offline status
  accounts          Account[]
  sessions          Session[]
  createdAt         DateTime        @default(now())
  updatedAt         DateTime        @updatedAt
  
  // Assignments relations
  assignmentsAsPatient      Assignment[]  @relation("PatientAssignments")
  assignmentsAsCounsellor   Assignment[]  @relation("CounsellorAssignments")
  assessmentResults         AssessmentResult[]
}
```

**Fields:**
- `id`: Unique identifier (CUID format)
- `name`: Optional user name
- `email`: Unique email address
- `hashedPassword`: Bcryptjs hashed password
- `emailVerified`: Email verification timestamp
- `image`: Optional profile image URL
- `role`: User role (ADMIN, COUNSELLOR, USER)
- `mustChangePassword`: Flag for force password change on next login
- `lastActive`: Timestamp of last activity
- `createdAt`: Account creation timestamp
- `updatedAt`: Last update timestamp

**Indices:**
- Email (unique)

---

#### **Account Model**
NextAuth.js Account model for OAuth providers (if used in future).

```prisma
model Account {
  id                String    @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?
  
  user              User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@unique([provider, providerAccountId])
}
```

---

#### **Session Model**
Manages user session tokens (currently using JWT, but schema supports session storage).

```prisma
model Session {
  id            String    @id @default(cuid())
  sessionToken  String    @unique
  userId        String
  expires       DateTime
  
  user          User      @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

---

#### **VerificationToken Model**
For email verification tokens.

```prisma
model VerificationToken {
  identifier String
  token      String    @unique
  expires    DateTime
  
  @@unique([identifier, token])
}
```

---

#### **Role Enum**
Defines available user roles.

```prisma
enum Role {
  ADMIN        // Full system access
  COUNSELLOR   // Can be assigned patients, access chat
  USER         // Patient/regular user
}
```

---

#### **Assignment Model**
Links patients with counsellors for counseling sessions.

```prisma
model Assignment {
  id            String    @id @default(cuid())
  patientId     String
  counsellorId  String
  assignedAt    DateTime  @default(now())
  isActive      Boolean   @default(true)
  
  patient       User      @relation("PatientAssignments", fields: [patientId], references: [id], onDelete: Cascade)
  counsellor    User      @relation("CounsellorAssignments", fields: [counsellorId], references: [id], onDelete: Cascade)
  
  @@unique([patientId, counsellorId])  // One assignment per pair
  @@index([patientId])
  @@index([counsellorId])
}
```

**Constraints:**
- One-to-one relationship per patient-counsellor pair
- Indexed for fast lookups by patient or counsellor

---

#### **AssessmentResult Model**
Stores psychological assessment test results.

```prisma
model AssessmentResult {
  id        String   @id @default(cuid())
  userId    String
  type      String   // e.g., "GAD-7", "PHQ-9"
  score     Int
  level     String   // e.g., "Mild anxiety", "Moderate depression"
  createdAt DateTime @default(now())
  
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

**Fields:**
- `type`: Assessment type identifier
- `score`: Numerical score from assessment
- `level`: Severity/interpretation level

---

#### **ChatMessage Model**
Real-time and historical chat messages.

```prisma
model ChatMessage {
  id        String   @id @default(cuid())
  room      String   // e.g., "private-chat-counsellorId-patientId"
  senderId  String
  sender    String   // email or name for display
  message   String
  timestamp DateTime @default(now())
  
  @@index([room])
  @@index([timestamp])
}
```

**Indices:**
- `room`: For fast message retrieval by chat room
- `timestamp`: For message ordering and time-based queries

---

#### **ContactMessage Model**
Contact form submissions from website visitors.

```prisma
model ContactMessage {
  id          String   @id @default(cuid())
  name        String
  occupation  String
  email       String
  phone       String
  message     String
  createdAt   DateTime @default(now())
  isRead      Boolean  @default(false)
}
```

---

### Relationships Diagram

```
┌─────────────────────────────────────────────┐
│                    User                     │
│  (id, email, role, mustChangePassword...)  │
└──────┬───────────────────────────────┬──────┘
       │                               │
       ├─── 1:N ─→ Account            │
       ├─── 1:N ─→ Session            │
       ├─── 1:N ─→ AssessmentResult   │
       │                               │
       ├─ "PatientAssignments" ──→ Assignment ←── "CounsellorAssignments" ─┤
       │                                                                    │
       └────────────────────────────────────────────────────────────────┘

ChatMessage & ContactMessage are independent (no foreign keys)
```

---

## Coding Practices & Standards

### 1. TypeScript Usage

**Strict Type Safety:**
```typescript
// ✅ GOOD: Explicit types on function parameters and returns
async function getUserById(userId: string): Promise<User | null> {
  return await prisma.user.findUnique({ where: { id: userId } });
}

// ❌ AVOID: Using 'any' type
async function getUserById(userId: any): Promise<any> {
  return await prisma.user.findUnique({ where: { id: userId } });
}
```

**Type Definitions for Complex Objects:**
```typescript
// Define custom types for request/response bodies
interface CreateUserRequest {
  email: string;
  password: string;
  name: string;
  role?: 'ADMIN' | 'COUNSELLOR' | 'USER';
}

interface CreateUserResponse {
  success: boolean;
  user: User;
}
```

**Type Augmentation:**
- NextAuth types extended in `src/types/next-auth.d.ts`
- Custom types in `src/types/`

---

### 2. API Route Patterns

**Standard Route Structure:**
```typescript
// src/app/api/[feature]/route.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    // 1. Authentication check
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Input validation
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    // 3. Database operation
    const data = await prisma.model.findUnique({ where: { id } });

    // 4. Response
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
```

**Error Handling:**
- Always use try-catch blocks
- Return appropriate HTTP status codes (400, 401, 403, 500)
- Include meaningful error messages in response
- Log errors to console for debugging

**Authentication Pattern:**
```typescript
async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return session;
}

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  const role = (session?.user as Record<string, unknown>)?.role;
  if (!session || role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  return session;
}
```

---

### 3. Component Patterns

**Server Components (Default):**
```typescript
// Fetch data server-side when possible
export default async function Page() {
  const data = await fetchData();
  return <div>{/* render data */}</div>;
}
```

**Client Components:**
```typescript
"use client"; // Must be at top of file

import { useState, useEffect } from 'react';

export default function InteractiveComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Client-side effects
  }, []);

  return <div>{/* interactive content */}</div>;
}
```

**Naming Conventions:**
```
✅ Component files: PascalCase.tsx (e.g., LoginForm.tsx, UserProfile.tsx)
✅ Utility files: camelCase.ts (e.g., formatDate.ts, validateEmail.ts)
✅ Type files: PascalCase or context (e.g., User.ts, next-auth.d.ts)
❌ AVOID: lowercase component names, kebab-case for components
```

---

### 4. State Management

**Context API Pattern:**
```typescript
// contexts/MyContext.tsx
"use client";

import { createContext, useContext, ReactNode } from 'react';

interface ContextValue {
  // Define your context shape
}

const Context = createContext<ContextValue | undefined>(undefined);

export function MyProvider({ children }: { children: ReactNode }) {
  const value: ContextValue = {
    // Provide values
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useMyContext() {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useMyContext must be used within MyProvider');
  }
  return context;
}
```

**Custom Hooks:**
```typescript
// hooks/useAuth.ts
import { useSession } from 'next-auth/react';

export function useAuth() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const user = session?.user;
  
  return { isAuthenticated, user, status };
}
```

---

### 5. Form Handling

**Form Submission Pattern:**
```typescript
"use client";

import { useState } from 'react';

export default function MyForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch('/api/endpoint', {
        method: 'POST',
        body: JSON.stringify({
          field: formData.get('field'),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to submit');
      }

      // Success handling
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      {/* form fields */}
      <button disabled={loading}>{loading ? 'Loading...' : 'Submit'}</button>
    </form>
  );
}
```

---

### 6. Database Queries

**Prisma Best Practices:**
```typescript
// ✅ GOOD: Select specific fields
const user = await prisma.user.findUnique({
  where: { id: userId },
  select: { id: true, email: true, name: true, role: true },
});

// ❌ AVOID: Fetching all fields when not needed
const user = await prisma.user.findUnique({ where: { id: userId } });

// ✅ GOOD: Use transactions for related operations
const result = await prisma.$transaction([
  prisma.user.update({ ... }),
  prisma.assignment.create({ ... }),
]);

// ✅ GOOD: Include relations when needed
const user = await prisma.user.findUnique({
  where: { id: userId },
  include: {
    assignmentsAsPatient: true,
    assignmentsAsCounsellor: true,
  },
});
```

**Connection Management:**
```typescript
// lib/prisma.ts - Singleton pattern for development
import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
```

---

### 7. Authentication & Authorization

**Protected API Routes:**
```typescript
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  
  // Check authentication
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Check role-based access
  const role = (session.user as Record<string, unknown>)?.role;
  if (role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Proceed with admin-only logic
}
```

**Frontend Auth Checks:**
```typescript
"use client";

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function AdminPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session || (session.user as Record<string, unknown>)?.role !== 'ADMIN') {
    redirect('/');
  }

  return <div>Admin Content</div>;
}
```

---

### 8. Styling

**TailwindCSS Usage:**
```typescript
// ✅ GOOD: Use utility classes
<div className="flex items-center justify-between gap-4 p-4">
  <h1 className="text-2xl font-bold">Title</h1>
  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
    Click me
  </button>
</div>

// ❌ AVOID: Writing custom CSS when utilities exist
<style>
  .my-div { display: flex; gap: 1rem; }
</style>
```

**Module CSS (for scoped styles):**
```typescript
// MenuButton.module.css
.button {
  padding: 0.5rem 1rem;
  background: blue;
}

.button:hover {
  background: darkblue;
}

// MenuButton.tsx
import styles from './MenuButton.module.css';

export function MenuButton() {
  return <button className={styles.button}>Menu</button>;
}
```

---

### 9. Error Handling

**Try-Catch Pattern:**
```typescript
try {
  const result = await riskyOperation();
  return NextResponse.json({ success: true, result });
} catch (error) {
  console.error('Operation failed:', error);
  
  if (error instanceof ValidationError) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  
  if (error instanceof PrismaClientValidationError) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }
  
  return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
}
```

---

### 10. Logging

**Console Logging:**
```typescript
// ✅ Use for debugging
console.error('Failed to fetch user:', error);
console.log('User created:', { id, email });

// ❌ AVOID: Console.log for user data in production
console.log('Password:', password); // Never log sensitive data
```

---

## Authentication & Authorization

### NextAuth Configuration

**Location:** `src/lib/auth.ts`

**Configuration Overview:**
```typescript
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // Validate credentials against database
        // Return user object if valid, null if invalid
      }
    })
  ],
  
  session: { strategy: 'jwt' },
  
  callbacks: {
    jwt: async ({ token, user }) => {
      // Add user id and role to JWT token
    },
    session: async ({ session, token }) => {
      // Expose token fields to session
    }
  },
  
  secret: process.env.NEXTAUTH_SECRET
};
```

### Session Structure

```typescript
interface Session {
  user: {
    id?: string;          // Added in callbacks
    email?: string;       // From NextAuth default
    name?: string;        // From NextAuth default
    image?: string;       // From NextAuth default
    role?: 'ADMIN' | 'COUNSELLOR' | 'USER'; // Added in callbacks
    mustChangePassword?: boolean; // Added in callbacks
  };
  expires: string;
}
```

### Role-Based Access Control (RBAC)

**Roles:**
- **ADMIN**: Full system access, user management, chat history viewing
- **COUNSELLOR**: Can be assigned patients, access chat, view assignments
- **USER**: Patient/regular user, can chat with assigned counsellor, complete assessments

**Authorization Pattern:**

1. **API Route Level:**
```typescript
const requireRole = async (allowedRoles: string[]) => {
  const session = await getServerSession(authOptions);
  const userRole = (session?.user as Record<string, unknown>)?.role;
  
  if (!session || !allowedRoles.includes(userRole as string)) {
    throw new Error('Forbidden');
  }
};
```

2. **Component Level:**
```typescript
"use client";

import { useSession } from 'next-auth/react';

export function AdminOnlyFeature() {
  const { data: session } = useSession();
  const isAdmin = (session?.user as Record<string, unknown>)?.role === 'ADMIN';
  
  if (!isAdmin) return null;
  
  return <div>Admin Feature</div>;
}
```

### Password Management

**Hashing:**
```typescript
import { hash, compare } from 'bcryptjs';

// Hash password on signup/creation
const hashedPassword = await hash(password, 10);

// Verify password on login
const isValid = await compare(inputPassword, hashedPassword);
```

**Force Password Change:**
- `mustChangePassword` flag in User model
- Set on user creation or admin action
- Must change password before accessing app features

---

## Component Architecture

### Layout & Pages

**Root Layout** (`src/app/layout.tsx`)
- Sets up global providers (AuthProvider, etc.)
- Includes global CSS
- Navigation and footer

**Page Structure:**
- Each feature has a dedicated page directory
- Page component handles routing
- Client components imported for interactivity

### Component Hierarchy

```
App (Root Layout)
├── ClientProviders (Context, SessionProvider)
│   ├── Navigation (navBar_v1/v2)
│   ├── Page Components
│   │   ├── Dashboard
│   │   ├── Assessment
│   │   ├── Chat
│   │   └── ...
│   └── Footer (footer_v1/v2)
└── Admin Components (Admin-only)
    ├── AdminUserList
    ├── AdminAssignments
    └── AdminChatHistory
```

### Commonly Used Components

**AuthContextProvider:**
- Wraps app with authentication context
- Provides user data to all child components

**ChatWidget:**
- Real-time messaging interface
- Uses Socket.io for live updates
- Private chat rooms between user and counsellor

**PresenceTracker:**
- Tracks user online/offline status
- Updates lastActive timestamp
- Emits socket events on status change

**Assessment Components:**
- `GADTest`: GAD-7 anxiety assessment
- `CalmSpace`: CALM Space assessment
- Collects responses and submits scores

---

## Development Setup

### Prerequisites
- Node.js 18+ (or use nvm)
- PostgreSQL 14+
- Docker & Docker Compose (optional, for PostgreSQL)

### Installation

1. **Clone Repository**
```bash
git clone <repository-url>
cd unsaid
```

2. **Install Dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
# Create .env.local file
cp .env.example .env.local

# Fill in required variables:
DATABASE_URL=postgresql://user:password@localhost:5432/unsaid
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

4. **Database Setup**
```bash
# Using Docker Compose
docker-compose up -d

# Run migrations
npx prisma migrate dev

# (Optional) Seed database
node scripts/seedUsers.mjs
```

5. **Start Development Server**
```bash
npm run dev
```

Access at `http://localhost:3000`

### Environment Variables

```bash
# Database
DATABASE_URL=postgresql://user:password@host:port/database

# Authentication
NEXTAUTH_SECRET=<random-secret-key>
NEXTAUTH_URL=http://localhost:3000

# Optional: Firebase (if using Firebase auth)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=

# Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=
```

### Database Migrations

**Create Migration:**
```bash
npx prisma migrate dev --name migration_name
```

**View Database:**
```bash
npx prisma studio
```

**Reset Database (Development Only):**
```bash
npx prisma migrate reset --force
```

### Available Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Production build
npm start            # Start production server
npm run lint         # Run ESLint
```

---

## Deployment & Build

### Build Process

```bash
# Generate Prisma Client without engine (for edge runtime)
npx prisma generate --no-engine

# Build Next.js application
next build
```

### Production Deployment

**Vercel (Recommended for Next.js):**
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Automatic deployments on push

**Docker Deployment:**
```bash
docker build -t unsaid:latest .
docker run -p 3000:3000 -e DATABASE_URL=... unsaid:latest
```

**Environment for Production:**
```bash
NODE_ENV=production
NEXTAUTH_URL=https://yourdomain.com
DATABASE_URL=postgresql://...
```

### Performance Optimizations

- **Turbopack** for fast development rebuilds
- **Image Optimization** via Next.js Image component
- **Database Indexing** on frequently queried fields (room, timestamp, userId)
- **Session Caching** via JWT
- **API Route Optimization** with selective field selection in Prisma queries

---

## Summary

This documentation provides a comprehensive guide to the Unsaid project structure, APIs, database design, and coding standards. Developers should:

1. Follow TypeScript strict mode
2. Use the established API route patterns with proper error handling
3. Implement authentication checks for protected routes
4. Use Prisma for all database operations
5. Follow component naming and organization conventions
6. Implement try-catch blocks and proper logging
7. Reference this documentation for API usage and structure

For questions or updates, please refer to inline code comments and existing implementations.
