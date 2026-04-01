# Project Context - NexusAI

**Project Name**: NexusAI
**Last Updated**: 2026-04-01
**Current Status**: Frontend page layer created under `frontend/src/app`; NestJS backend modules now scaffolded under `backend/src`

## Completed Files

### Data Files (`frontend/src/data/`)
- `labs.json` - Lab catalog
- `research.json` - Research feed items
- `usecases.json` - Use case definitions
- `comparison.json` - Comparison rows
- `trending.json` - Trending cards
- `budget-tiers.json` - Budget buckets
- `models.json` - Model catalog with featured/trending/variation data

### Shared Infrastructure (`frontend/src/`)
- `types/index.ts` - Base TypeScript interfaces
- `api.ts` - Mock API over static JSON
- `store.ts` - Original Zustand stores
- `globals.css` - Global styles and tokens
- `lib/api.ts` - `@/lib/api` adapter layer
- `lib/store.ts` - `@/lib/store` chat state for the new chat hub
- `lib/types/index.ts` - `@/lib/types` re-export layer
- `app/layout.tsx` - Root layout for the `src/app` router

### New App Pages (`frontend/src/app/`)
- `page.tsx` - Landing page
- `marketplace/page.tsx` - Marketplace page
- `chat/page.tsx` - Chat hub
- `agents/page.tsx` - Agents templates page
- `research/page.tsx` - Research feed

### Landing / Marketplace Components (`frontend/src/components/sections/`)
- `site-nav.tsx`
- `hero-section.tsx`
- `hero-search-card.tsx`
- `hero-action-grid.tsx`
- `featured-models.tsx`
- `builder-cards.tsx`
- `browse-by-lab.tsx`
- `comparison-table-section.tsx`
- `trending-section.tsx`
- `budget-section.tsx`
- `usecase-section.tsx`
- `newsletter-banner.tsx`
- `footer-strip.tsx`
- `model-grid.tsx`
- `lab-pills.tsx`
- `active-lab-banner.tsx`

### Model Components (`frontend/src/components/model/`)
- `model-card.tsx`
- `model-modal.tsx`
- `model-search-bar.tsx`
- `model-sidebar-item.tsx`

### Chat Components (`frontend/src/components/chat/`)
- `app-nav.tsx`
- `chat-bubble.tsx`
- `chat-input.tsx`
- `chat-sidebar.tsx`
- `right-panel.tsx`
- `typing-indicator.tsx`
- `category-prompt-panel.tsx`
- `greet-card.tsx`
- `onboarding-question-card.tsx`
- `variation-selector.tsx`
- `variation-detail-card.tsx`
- `model-intro-card.tsx`
- `prepop-prompt-card.tsx`
- `congrats-banner.tsx`
- `inspiration-chips.tsx`
- `agent-wizard-card.tsx`
- `sparkline.tsx`
- `attach-chip.tsx`

### Research Components
- `frontend/src/components/research/research-feed-card.tsx`

## Notes
- The `@/*` alias resolves to `frontend/src/*`.
- New pages/components were built against `@/components` and `@/lib` imports as requested.
- Every new page includes loading, empty, and content states.
- Every newly created page/component file is below the 200-line cap.
- A legacy scaffold still exists under `frontend/app` and was left untouched to respect the instruction not to rewrite completed files.

## Tech Stack
- Frontend: Next.js, React, TypeScript, Tailwind CSS, Framer Motion
- Backend: NestJS, Mongoose, JWT, Swagger, class-validator
- State Management: Zustand
- Data: Static JSON imports only
- Design target: mobile-first, 375px minimum

## Backend Status
- `backend/src/main.ts` now bootstraps `api/v1`, CORS, global `ValidationPipe`, Swagger, and a global HTTP exception filter.
- `backend/src/app.module.ts` wires `ConfigModule`, `MongooseModule`, and feature modules for auth, models, chat, agents, and research.
- Common backend utilities exist in `backend/src/common/` for standard responses, pagination, param DTOs, current-user extraction, and exception formatting.
- Config loaders exist in `backend/src/config/` for MongoDB and JWT settings.
- Feature modules exist in `backend/src/modules/`:
- `auth/` with user schema, register/login DTOs, bcrypt password hashing, JWT strategy, and guard.
- `models/` with model schema, CRUD, search, filter, compare, labs, and types endpoints.
- `chat/` with user-scoped conversations, CRUD, and add-message endpoint behind JWT auth.
- `agents/` with user-scoped CRUD behind JWT auth.
- `research/` with paginated feed and trending endpoints.
- `backend/.env` was added with `PORT`, `MONGODB_URI`, `JWT_SECRET`, and `JWT_EXPIRES_IN` placeholders.
- Backend dependencies for config, Swagger, JWT, Passport, Mongoose, bcrypt, and validation were installed.

## Next Steps
1. Run a local build in an environment with Node/NPM available on PATH
2. Resolve pre-existing repo-level TypeScript issues in untouched legacy files if they block the build
3. Decide whether the old `frontend/app` scaffold should be removed or migrated into `frontend/src/app`
