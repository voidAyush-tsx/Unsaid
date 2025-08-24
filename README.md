<div style="text-align: center;">

# UNSAID

Empowering Minds, Transforming Lives Through Innovation

[![last commit today](https://img.shields.io/badge/last%20commit-today-blue)](https://github.com/Ayush007-pro/Unsaid/commits/master) [![typescript](https://img.shields.io/badge/typescript-99.3%25-blue)](https://www.typescriptlang.org/) [![languages](https://img.shields.io/github/languages/count/Ayush007-pro/Unsaid)](https://github.com/Ayush007-pro/Unsaid)

Built with the tools and technologies:

![JSON](https://img.shields.io/badge/JSON-000000?style=for-the-badge&logo=JSON&logoColor=white) ![Markdown](https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=Markdown&logoColor=white) ![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white) ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=Firebase&logoColor=black) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black) ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white) ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=ESLint&logoColor=white) ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=Tailwind-CSS&logoColor=white)

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

1. Clone the repository:
   ```
   git clone https://github.com/Ayush007-pro/Unsaid
   ```

2. Navigate to the project directory:
   ```
   cd Unsaid
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Set up environment variables:
   - Create a `.env.local` file in the root directory.
   - Add Firebase configuration (e.g., API key, auth domain) and any other sensitive data:
     ```
     NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
     ```

## Usage

Run the project with:
```
npm run dev
```

The application will be available at `http://localhost:3000`. Use this development server to test and iterate on the codebase.

## Testing

Unsaid uses Jest as the test framework. Run the test suite with:
```
npm test
```

Ensure test files are placed in `__tests__` directories or end with `.test.ts(x)`. Coverage reports can be generated with:
```
npm run test:coverage
```

## Features

- **Homepage**: Welcoming narrative, core values, and call-to-action for assessments.
- **Connect Page**: Options for chat, voice, and video support with counselor matching.
- **Assessment Page**: Interactive GAD test with emotional index scoring.
- **About Us**: Team story and counselor profiles.
- **Contact Us**: Contact form, FAQs, and support channels.
- **Authentication**: Secure sign-in and sign-up flows with Firebase.

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/new-feature`).
3. Commit changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Open a pull request with a clear description of changes.

Adhere to ESLint rules and ensure TypeScript type safety. Collaboration is encouraged to enhance scalability and user experience.