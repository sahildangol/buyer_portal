1. Project Overview

This project is a take-home assessment for a Junior Full-Stack Engineer role.

The goal is to build a small but production-quality full-stack application that demonstrates:

Clean architecture
Authentication and authorization
Database design
Frontend-backend integration
Deployment readiness

The application simulates a buyer portal where users can manage their favourite properties.

2. Core Objectives

The implementation should prioritize:

Readability over cleverness
Simplicity over overengineering
Clear separation of concerns
Real-world best practices

This is not about building a large system, but about showing:

Good engineering judgment
Solid fundamentals
Clean, maintainable code 3. Tech Stack
Backend
Node.js
Express
TypeScript
Prisma ORM
PostgreSQL
JWT for authentication
bcrypt for password hashing
Frontend
React (Vite)
TypeScript
Axios for API calls
DevOps
Docker
docker-compose
Environment-based configuration 4. Application Features
Authentication
User registration (email + password)
Secure password hashing (bcrypt)
Login with JWT token issuance
Protected routes via middleware
Buyer Dashboard
Display logged-in user info (name, role)
View "My Favourites"
Add/remove properties from favourites
Ensure strict user-level data isolation
Properties
Pre-seeded list of properties
Users can “favourite” properties 5. Database Design
Tables

User

id
email (unique)
password (hashed)
name
role

Property

id
title
description (optional)

Favourite

id
userId
propertyId
UNIQUE(userId, propertyId) 6. Architecture Guidelines

Backend must follow layered architecture:

routes → controllers → services → models (Prisma)
Responsibilities
Routes: Define endpoints and attach middleware
Controllers: Handle request/response logic
Services: Business logic and rules
Models (Prisma): Database interaction 7. Security Practices
Never store plain-text passwords
Always hash passwords with bcrypt
Use JWT for stateless authentication
Protect private routes with auth middleware
Ensure users can only access their own data 8. API Design
RESTful endpoints
Proper HTTP status codes
Consistent response format
Centralized error handling 9. Frontend Guidelines
Keep UI simple and clean
Focus on functionality over design
Handle:
loading states
success states
error states
Store JWT securely (localStorage is acceptable for this project)
Use Axios with a configured instance 10. DevOps & Environment
Use Docker for both frontend and backend
Use docker-compose for full system setup
Environment variables must be used for:
DB connection
JWT secret
ports 11. Deployment Expectations
Backend and frontend should be deployable independently
Production build scripts should exist
No hardcoded secrets 12. Non-Goals (Important)

Avoid:

Microservices
Complex state management (Redux, etc.)
Over-abstraction
Premature optimization 13. Success Criteria

A successful submission will demonstrate:

Clean and understandable codebase
Proper authentication flow
Correct data isolation
Functional UI with API integration
Dockerized setup
Clear documentation 14. Development Approach

Work in phases:

Project setup (structure, Docker, DB)
Authentication
Favourites backend
Frontend integration
Docker & deployment polish
Documentation 15. Key Principle

Build like this is going to production — but only implement what is necessary.
