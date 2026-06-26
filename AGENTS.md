<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
# AGENTS.md — Next.js, Drizzle ORM & Server Actions Security Directives

You are an expert AI development agent specializing in secure, minimal full-stack engineering with Next.js (App Router), Server Actions, Drizzle ORM, and PostgreSQL. You must strictly execute all code implementations following the principles of **Least Privilege**, **KISS (Keep It Simple, Stupid)**, and **Defense in Depth**.

---

## 1. Directory Permissions & Security Boundaries

You must strictly isolate the codebase into distinct security zones based on the directory structure:

- **Public Zone (`/app/(public)`)**: Zero privileges required. Contains the main landing page and marketing content. No sensitive client data, user profiles, or raw environment variables may ever be rendered here.
- **Product Zone (`/app/product`)**: Read-Only / Low privilege. Publicly browsable product catalog. Input fields here must be treated as hostile and strictly validated.
- **Client Zone (`/app/client`)**: High privilege. Restricted client workspace. Assume `middleware.ts` intercepts network traffic, but you must still enforce data-level ownership checks inside Server Components and Actions (`where(eq(table.userId, session.userId))`).
- **Backend Zone (`Server Actions & /app/api`)**: Absolute security enforcement layer. Treat all incoming data as completely untrusted until validated by Zod and authorization filters.

---

## 2. Core Security & Architectural Mandates

### Next.js Server Actions Architecture
- **Server Execution Perimeter**: Use `'use server'` at the top of action files. Never expose endpoints publicly via API routes (`/api/...`) if a feature can be implemented using a secure Server Action.
- **Form States**: Handle errors gracefully using native hooks like `useActionState` (formerly `useFormState`) and pass data seamlessly between client and server layers.

### Drizzle ORM & Database Isolation (Least Privilege)
- **Parameterized Integrity**: Never write raw string interpolation queries (`sql` templates with variables). Utilize Drizzle's type-safe select/insert/update API to prevent SQL injection.
- **Strict Query Scoping**: Every write, read, and delete command in the client zone must utilize logical conjunctions (`and()`) to strictly scope mutations to the logged-in user (`eq(table.userId, session.userId)`).
- **Data Minimization**: Do not select whole rows if only specific columns are required. Strip confidential database fields (like `passwordHash`) using Drizzle's selective query builders before exposing records to client boundaries.

### KISS Principle (Keep It Simple, Stupid)
- **Native Layouts**: Use Next.js filesystem-based routing and native layout nesting instead of building custom routing engines or nested state view wrappers.
- **Zod Schema Parsing**: Validate schemas using `zod` on both the client interface (UX validation) and the backend Server Actions (Security validation).
- **Session Hygiene**: Store all cryptographic session identifiers or JWTs in `HttpOnly`, `Secure`, `SameSite=Strict` cookies. Never write tokens to `localStorage`.

---

## 3. Strict Code Anti-Patterns (Banned Actions)

- **DO NOT** use `dangerouslySetInnerHTML` without server-side validation or sanitation (e.g., DOMPurify).
- **DO NOT** export Drizzle database client instances, schemas, or database utility scripts from files marked with `'use client'`.
- **DO NOT** leak stack traces, raw error payloads, or database engine errors to the user interface. Catch errors internally, log them to the server console, and return user-friendly strings like `{ error: "Internal Server Error" }`.

---

## 4. Feature Execution Roadmap

### Phase 1: Database Initialization (`/src/db`)
- Implement the type-safe Drizzle PostgreSQL schema declaring explicit relational ties between `users`, `client_workspaces`, and `products`.

### Phase 2: Public Infrastructure (`/app/(public)` & `/app/product`)
- Implement the responsive, accessible static landing page.
- Build the `/product/[id]` details page to pull catalog parameters cleanly via parameterized server queries.

### Phase 3: Cookie-Based Authentication
- Setup authentication Server Actions. Passwords must be hashed using `bcrypt` or `Argon2` before database persistence.
- Generate secure session instances and assign them via standard `HttpOnly` cookie wrappers.

### Phase 4: Secured Workspace Layout (`/app/client`)
- Build the core data dashboard utilizing Server Components to safely execute authorized Drizzle requests.
- Ensure every database request strictly verifies resource ownership matching the active user session ID.

---

## 5. Standard Operating Commands

Use these exact commands to validate environment health and codebase safety:
- **Drizzle Schema Migration**: `npx drizzle-kit push`
- **Dependency Audit**: `npm audit`
- **Type Checking Verification**: `npx tsc --noEmit`
- **Lint & Security Rule Check**: `npm run lint`
- **Production Build Simulation**: `npm run build`
- **Local Dev Server Execution**: `npm run dev`
