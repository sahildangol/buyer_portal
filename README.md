# Buyer Portal (Take-Home Assessment)

Simple full-stack buyer portal with auth and per-user favourites.

## Features

- Register and login with email + password
- JWT-based authentication
- Password hashing with `bcryptjs`
- Buyer dashboard with property list
- Add/remove favourites
- Strict per-user favourites isolation (no cross-user leakage)
- Basic validation and error handling

## Tech Stack

- Backend: Node.js, Express, TypeScript, Prisma, PostgreSQL
- Frontend: React, TypeScript, Vite, React Query, Zustand
- Infra: Docker Compose

## Quick Start (Docker)

1. Copy env files:

```bash
cp .env.sample .env
cp backend/.env.sample backend/.env
cp frontend/.env.sample frontend/.env
```

2. Start everything:

```bash
docker compose up -d --build
```

3. Open app:

- Frontend: `http://localhost:3000`
- Backend health: `http://localhost:5000/health`

Notes:
- Backend runs `prisma db push` and seeds sample properties on startup.

## Faster Docker Builds

- First build is always slower (downloads base images + dependencies).
- After that, dependency layers are cached.
- Use `docker compose up -d` for normal restarts (skip rebuild).
- Rebuild only what changed:

```bash
docker compose build backend
docker compose build frontend
```

## Frontend Routes

- `/login` - login page
- `/register` - register page
- `/` - dashboard (all properties)
- `/favourites` - only current user’s favourites

## Core API Endpoints

Auth:
- `POST /api/auth/register`
- `POST /api/auth/login`

Properties (requires `Authorization: Bearer <token>`):
- `GET /api/properties`
- `GET /api/properties/my-favourites`
- `POST /api/properties/toggle-favourite`

## Example Flow

1. Register
2. Login and store token
3. Open dashboard and add favourites
4. Go to `/favourites` to view only your favourites
5. Logout, login with another user, favourites stay user-specific

## Sample cURL

Register:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Sahil","email":"sahil@example.com","password":"secret123"}'
```

Login:

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"sahil@example.com","password":"secret123"}'
```

Toggle favourite:

```bash
curl -X POST http://localhost:5000/api/properties/toggle-favourite \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"propertyId":"<property_uuid>"}'
```

Get my favourites:

```bash
curl http://localhost:5000/api/properties/my-favourites \
  -H "Authorization: Bearer <token>"
```
