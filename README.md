<div align="center">

# UNSAID  

Empowering Minds, Transforming Lives Through Innovation  

[![last commit today](https://img.shields.io/badge/last%20commit-today-blue)](https://github.com/Ayush007-pro/Unsaid/commits/master)
[![typescript](https://img.shields.io/badge/typescript-99.3%25-blue)](https://www.typescriptlang.org/)
[![languages](https://img.shields.io/github/languages/count/Ayush007-pro/Unsaid)](https://github.com/Ayush007-pro/Unsaid)

---

### Built with the tools and technologies

![JSON](https://img.shields.io/badge/JSON-000000?style=for-the-badge&logo=JSON&logoColor=white)
![Markdown](https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=Markdown&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=Firebase&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=ESLint&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=Tailwind-CSS&logoColor=white)

</div>

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Features](#features)
- [Contributing](#contributing)

## Overview

Unsaid is a mental health support web application built to provide accessible counseling, assessments, and community resources. Designed with empathy and innovation, it features a responsive interface with pages for home, connection, assessments (e.g., GAD tests), about us, contact, and authentication. The project leverages a modern tech stack to ensure scalability, type safety, and a seamless user experience, targeting individuals seeking mental health support.

## Getting Started

### Prerequisites

This project requires the following dependencies:

- **Programming Language**: TypeScript
- **Package Manager**: npm
- **Node.js**: Version 16.x or higher
- **Framework**: Next.js
- **Database**: Firebase (for real-time data and authentication)
- **CSS Framework**: Tailwind CSS

### Installation

Build Unsaid from the source and install dependencies:

# UNSAID

Empowering minds — a mental health support web application built with Next.js and TypeScript.

[![last commit today](https://img.shields.io/badge/last%20commit-today-blue)](https://github.com/thecoderwithHat/Unsaid/commits/main)

---

## Table of contents

- [Overview](#overview)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Environment variables](#environment-variables)
   - [Database & Prisma](#database--prisma)
- [Scripts](#scripts)
- [Testing](#testing)
- [Features](#features)
- [Contributing](#contributing)

## Overview

Unsaid is a mental health support web application that offers assessments, counseling connection flows, an informational about page, and authentication. The app is built with accessibility and scalability in mind using a modern React/Next stack.

## Tech stack

- Next.js (App Router)
- React + TypeScript
- Prisma ORM + PostgreSQL (pg)
- NextAuth.js for authentication
- Firebase (client SDK + firebase-admin for server-side features)
- Pusher for realtime chat
- Tailwind CSS

## Getting started

### Prerequisites

- Node.js (16.x or newer; Node 18+ recommended)
- npm (or yarn/pnpm if you prefer)
- A PostgreSQL database (local or hosted) or another database supported by Prisma

### Installation

1. Clone the repository:

    git clone https://github.com/thecoderwithHat/Unsaid.git

2. Enter the project directory and install dependencies:

    cd Unsaid
    npm install

3. Create a `.env.local` file at the project root (see the example below).

### Environment variables

The project expects a few environment variables. Add these to `.env.local`:

- DATABASE_URL=postgresql://user:password@host:5432/dbname
- NEXTAUTH_URL=http://localhost:3000
- NEXTAUTH_SECRET=some_long_secret
- NEXT_PUBLIC_FIREBASE_API_KEY=...
- NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
- FIREBASE_SERVICE_ACCOUNT (or provide a service account JSON file and load it in your deployment)

Adjust values for production accordingly.

### Database & Prisma

This repository uses Prisma. After setting `DATABASE_URL`:

- Generate Prisma client and run migrations (development):

   npx prisma generate
   npx prisma migrate dev --name init

- If you prefer to push schema without generating migrations (not recommended for production):

   npx prisma db push

- There is a seed script at `scripts/seedUsers.mjs` — run it after migrations if you want local seed data:

   node scripts/seedUsers.mjs

## Scripts

Use npm to run the standard scripts defined in `package.json`:

- npm run dev — run the app in development (Next.js)
- npm run build — generate Prisma client and build for production
- npm start — start the production server
- npm run lint — run ESLint

Example (development):

   npm run dev

The app will be available at http://localhost:3000 by default.

## Testing

There are no automated tests configured in `package.json` at the moment. If you want to add tests, consider Jest + React Testing Library for components and a small integration test setup for API routes.

## Features

- Homepage with calls to action
- Connect (chat/counseling) flows using Pusher for realtime
- Assessment pages (GAD-like tests)
- Authentication via NextAuth/Firebase
- Admin API endpoints and Prisma-managed user data

## Contributing

Contributions are welcome. Typical workflow:

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit your changes and push
4. Open a pull request describing the change

Please follow the existing linting and TypeScript conventions.

## Troubleshooting

- If Prisma client is missing, run `npx prisma generate`.
- If you get database errors, double-check `DATABASE_URL` and that the DB is reachable.

---

If you'd like, I can also:

- add a minimal `.env.example` file,
- add a small CI workflow for lint/build,
- or create a short developer checklist in the README.
