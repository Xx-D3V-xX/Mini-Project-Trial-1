# Mumbai Travel Exploration App

## Overview

A full-stack web application for exploring Mumbai's attractions, generating AI-powered travel itineraries, and managing personalized travel plans. The app combines curated points of interest (POIs) with intelligent trip planning to help users discover and experience Mumbai's culture, heritage, food, and landmarks.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for server state management and caching
- Tailwind CSS for styling with custom design system

**UI Component Library:**
- shadcn/ui components built on Radix UI primitives
- Custom theme system supporting light/dark modes
- Design inspired by Airbnb's visual storytelling approach
- Typography hierarchy using Inter (primary) and Playfair Display (accent) fonts

**State Management Strategy:**
- AuthContext for global authentication state
- TanStack Query for server data caching and synchronization
- Local component state for UI interactions
- Token-based authentication stored in localStorage

**Key Pages:**
- `/` - Landing page with hero and features sections
- `/explore` - Browse curated trails with search and category filtering
- `/itinerary` - Generate AI-powered travel itineraries
- `/profile` - View saved itineraries and visit history
- `/login` & `/register` - Authentication flows

**Protected Routes:**
Protected routes use a ProtectedRoute wrapper component that checks authentication state and redirects unauthenticated users to `/login`. The auth state is validated on app load by checking localStorage tokens.

### Backend Architecture

**Technology Stack:**
- Node.js with Express.js for REST API server
- TypeScript for type safety across server code
- Drizzle ORM for database interactions
- PostgreSQL as the primary database (via Neon serverless)

**Authentication System:**
- JWT (JSON Web Tokens) for stateless authentication
- bcrypt for password hashing with 10 salt rounds
- Token-based authorization via Authorization header
- Middleware function `authenticateToken` validates tokens on protected routes

**API Structure:**
- `/api/auth/register` - User registration
- `/api/auth/login` - User authentication
- `/api/auth/validate` - Token validation
- `/api/pois` - List all points of interest
- `/api/itinerary/generate` - Generate AI itineraries
- `/api/profile` - User profile data
- `/api/profile/itineraries` - User's saved itineraries
- `/api/profile/history` - User's visit history

**Data Storage:**
Currently using in-memory storage (MemStorage class) with seeded POI data. The architecture supports switching to PostgreSQL via Drizzle ORM by implementing the IStorage interface.

**Database Schema (Drizzle):**
- `users` - User accounts (id, username, password)
- `pois` - Points of interest (id, title, description, imageUrl, duration, difficulty, category)
- `itineraries` - Saved trip plans (id, userId, title, days, data as JSON, createdAt)
- `visitHistory` - User visit tracking (id, userId, poiId, visitedAt)

### Design System

**Color System:**
- HSL-based color variables for theme consistency
- Automatic dark mode support via CSS variables
- Elevation system using rgba overlays for interactive states

**Spacing & Layout:**
- Tailwind spacing units (2, 4, 6, 8, 12, 16, 20, 24)
- Responsive container widths (max-w-7xl for content, max-w-4xl for reading)
- Mobile-first responsive design approach

**Component Patterns:**
- Reusable card-based layouts for trails and itineraries
- Form components with validation support
- Accordion-based itinerary displays
- Badge system for categorization

## External Dependencies

### Third-Party Services

**OpenAI Integration:**
- Used for AI-powered itinerary generation
- API configured via environment variable (implied in routes.ts import)
- Generates personalized day-by-day travel plans based on user preferences

**Database:**
- Neon serverless PostgreSQL (configured via DATABASE_URL environment variable)
- Drizzle ORM for database migrations and queries
- Connection pooling via @neondatabase/serverless

### Authentication & Security

**Environment Variables Required:**
- `SESSION_SECRET` - JWT signing key (required)
- `DATABASE_URL` - PostgreSQL connection string (required)
- OpenAI API key (implied for itinerary generation)

**Security Measures:**
- CORS enabled for cross-origin requests
- Password hashing with bcrypt
- JWT token expiration and validation
- Protected API routes with middleware

### Asset Management

**Static Assets:**
- Generated images stored in `attached_assets/generated_images/`
- Image fallbacks to Unsplash for missing POI images
- Favicon and meta tags for SEO

### Development Tools

**Replit-Specific Plugins:**
- Runtime error overlay for development
- Cartographer plugin for code mapping
- Dev banner for environment indication

**Build & Deployment:**
- Development: Vite dev server with HMR + Express backend
- Production: Vite static build + esbuild bundled server
- Single build command produces both client and server artifacts