# Character Management App

Full-stack character management application with a NestJS GraphQL backend and a Next.js frontend.

## Features

- Cursor-ready `take` / `skip` pagination with infinite scroll on the frontend
- Character detail pages at `/characters/[id]` with `generateStaticParams` SSG
- Client-side favorites persisted in `localStorage`
- URL-backed filters and sorting via `nuqs`
- GraphQL subscription notification for newly created characters
- Dark / light / system theme persistence with `next-themes`
- Skeleton loading, card/list layouts, and `framer-motion` transitions
- Character statistics banner
- Zod-backed URL param validation
- Next.js error boundary with retry
- Docker Compose for one-command startup
- Playwright E2E coverage for the main filter flow

## Quick Start

### Docker Compose

```bash
docker compose up --build
```

Frontend: http://localhost:3000  
Backend GraphQL: http://localhost:3001/graphql

Seed demo data after the containers are running:

```bash
docker compose exec backend npm run prisma:seed
```

The seed script clears existing characters before inserting demo data, so use it only when you want to reset the character list.

### Local Development

Backend:

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
npm run start:dev
```

Frontend:

```bash
cd frontend
npm install
npm run codegen
npm run dev
```

## Useful Commands

Backend:

```bash
npm run build
npm run prisma:seed
```

Frontend:

```bash
npm run codegen
npm run build
npm run test:e2e
```

## GraphQL Highlights

```graphql
query GetCharacters(
  $filter: CharacterFilterInput
  $pagination: CharacterPaginationInput
  $sort: CharacterSort
) {
  characters(filter: $filter, pagination: $pagination, sort: $sort) {
    nodes {
      id
      name
      status
      gender
      image
      description
      createdAt
    }
    totalCount
    pageInfo {
      hasNextPage
      nextSkip
      endCursor
    }
  }
}
```

```graphql
subscription CharacterAdded {
  characterAdded {
    id
    name
    status
  }
}
```
