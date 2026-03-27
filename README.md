# Buyer Portal API (Take-Home Assessment)

Production-style backend for a simple buyer portal where users can register, login, view properties, and manage their own favourites.

## What Is Implemented

- Authentication with JWT
- Protected routes with auth middleware
- Property listing
- Per-user favourites (strict data isolation)
- Zod request validation
- Centralized success and error response wrappers
- Dockerized API + PostgreSQL setup

## Tech Stack

- Node.js + Express + TypeScript
- Prisma ORM + PostgreSQL
- JWT + bcryptjs
- Docker + Docker Compose

## Project Structure (Backend)

Layered architecture is used:

- `routes` -> `controllers` -> `services` -> `prisma`

## Prerequisites

- Docker + Docker Compose
- pnpm (only needed for Prisma schema push/seed commands from host)

## Environment Setup

1. Copy root env file:

```bash
cp .env.sample .env
```

2. (Recommended) Update `.env` values before running:

- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `DB_PORT`
- `API_PORT`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`

## Run With Docker (DB + API)

1. Build and start services:

```bash
docker compose up -d --build
```

2. Check service status:

```bash
docker compose ps
```

3. Check API logs:

```bash
docker compose logs -f backend
```

4. Health check:

```bash
curl http://localhost:5000/health
```

Expected:

```json
{ "status": "ok" }
```

Schema initialization and property seed are automated on backend container startup.
The backend runs `prisma db push` and then seeds properties before starting the server.

## Manual DB Setup (Optional)

Use this only when you run backend outside Docker:

```bash
pnpm --dir backend install
pnpm --dir backend exec prisma db push
pnpm --dir backend db:seed
```

## API Base URL

- `http://localhost:5000`

## Response Format

Successful responses:

```json
{
  "success": true,
  "message": "string",
  "data": {}
}
```

Error responses:

```json
{
  "success": false,
  "error": {
    "message": "string",
    "stack": "shown only in development"
  }
}
```

## API Endpoints

### Auth

#### Register

- `POST /api/auth/register`
- Body:

```json
{
  "name": "Sahil",
  "email": "sahil@example.com",
  "password": "secret123"
}
```

#### Login

- `POST /api/auth/login`
- Body:

```json
{
  "email": "sahil@example.com",
  "password": "secret123"
}
```

- Returns JWT token in `data.token`

### Properties

All routes below require:

- `Authorization: Bearer <token>`

#### Get All Properties

- `GET /api/properties`

#### Get My Favourites

- `GET /api/properties/my-favourites`

Returns only properties favourited by the logged-in user.

#### Toggle Favourite

- `POST /api/properties/toggle-favourite`
- Body:

```json
{
  "propertyId": "uuid-property-id"
}
```

Behavior:

- Adds favourite if it does not exist
- Removes favourite if it already exists

## Quick cURL Flow

1. Register:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Sahil","email":"sahil@example.com","password":"secret123"}'
```

2. Login:

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"sahil@example.com","password":"secret123"}'
```

3. Copy token from login response and set:

```bash
TOKEN="<your_jwt_token>"
```

4. List properties:

```bash
curl http://localhost:5000/api/properties \
  -H "Authorization: Bearer $TOKEN"
```

5. Toggle favourite:

```bash
curl -X POST http://localhost:5000/api/properties/toggle-favourite \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"propertyId":"<property_uuid>"}'
```

6. Fetch my favourites:

```bash
curl http://localhost:5000/api/properties/my-favourites \
  -H "Authorization: Bearer $TOKEN"
```

## Notes

- Passwords are hashed with bcryptjs
- JWT auth is stateless
- Favourites are isolated by logged-in user ID
- API and DB run independently through Docker Compose
