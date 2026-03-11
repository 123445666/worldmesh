# Architecture (Draft)

## Proposed stack

### Frontend
- Next.js
- TypeScript
- Tailwind or minimal CSS system
- Map integration via OpenStreetMap-compatible library

### Backend
- Node.js / TypeScript API
- PostgreSQL
- Prisma or Drizzle ORM
- Background jobs for notifications and imports

### Auth
- email magic link or OAuth
- organization and project-level permissions

### Deployment
- container-friendly
- single-node self-hostable first
- federation later

## Core architectural needs

- auditability
- permission boundaries
- event/activity history
- geospatial support
- clear ownership of entities
- extensible domain model

## Suggested high-level modules

- auth
- organizations
- problems
- projects
- tasks
- resources
- locations
- decisions
- activity
- public views
- notifications

## Key non-functional requirements

- understandable by small teams
- easy self-hosting
- graceful privacy controls
- strong data export options
- transparent change history
