# Lizdas Project Frontend

A Next.js application for an online learning platform focused on music production.

## Project Structure

The project has been refactored to follow a clean, modular architecture with clear separation of concerns:

```
/src
  /app                 # Next.js App Router pages
  /components          # Reusable React components
    /common            # Shared UI components
    /coursesPage       # Components for the courses feature
    /icons             # SVG icon components
    /landingPage       # Components for the landing page
    /layout            # Layout components
  /hooks               # Custom React hooks
  /services            # Data and service layer
  /types               # TypeScript type definitions
  /utils               # Utility functions
```

## Key Architecture Decisions

### Separation of Concerns

- **Types**: All type definitions are centralized in the `/types` directory
- **Data Management**: Course data is separated from UI in the `/services` directory
- **Business Logic**: Isolated in custom hooks and utility functions
- **UI Components**: Broken down into small, reusable pieces
- **State Management**: Course progress management in a dedicated hook

### DRY (Don't Repeat Yourself)

- Shared UI components avoid duplication (LessonCard, VideoPlayer, etc.)
- Utility functions extract common logic (video URL handling, lesson navigation)
- Type sharing ensures consistent data structure usage

### Reusability

- Components accept className props for flexible styling
- Components are properly typed with TypeScript interfaces
- Business logic is extracted from UI components

## Core Features

- Course progress tracking with localStorage persistence
- Video lessons organized by sections
- Downloadable materials for each lesson
- Navigation between lessons

## Getting Started

```bash
# Start development server
npm run dev

# Build production version
npm run build

# Run production build
npm run start

# Run ESLint for code quality
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- React