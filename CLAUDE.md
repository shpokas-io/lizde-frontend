# CLAUDE.md - Lizdas Project Frontend Guide

## Build & Dev Commands
- `npm run dev` - Start development server
- `npm run build` - Build production version
- `npm run start` - Run production build
- `npm run lint` - Run ESLint for code quality

## Code Style Guidelines
- **Imports**: Group imports by external libs, then internal components (@/*)
- **TypeScript**: Use strict typing with explicit interfaces for props and data
- **Naming**: PascalCase for components, camelCase for functions/variables
- **Components**: Prefer functional components with proper TypeScript interfaces
- **File Structure**: Follow Next.js App Router conventions
- **CSS**: Use Tailwind for styling with consistent class ordering
- **Error Handling**: Use Next.js error boundaries and notFound() when appropriate
- **Data Fetching**: Follow Next.js data fetching patterns (ServerComponents)

## Project Structure
- `/src/app` - Next.js app router pages and layouts
- `/src/components` - Reusable React components (grouped by purpose)
- `/src/app/lib` - Shared utilities and data

This project is a Next.js application using TypeScript, Tailwind CSS, and the App Router pattern.