# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Install Dependencies
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Starts the development server on `http://localhost:3000`

### Build & Deploy
```bash
npm run build          # Build for production
npm run preview        # Preview production build locally
npm run generate       # Generate static site
```

### Database Operations
```bash
npx prisma generate     # Generate Prisma client after schema changes
npx prisma db push      # Push schema changes to database
npx prisma studio       # Open Prisma Studio for database management
```

### Code Quality
```bash
npx eslint .           # Run ESLint
```

## Architecture Overview

### Tech Stack
- **Framework**: Nuxt.js 4 (Vue 3)
- **Styling**: Tailwind CSS v4 with @nuxt/ui
- **Database**: MySQL with Prisma ORM
- **Authentication**: JWT tokens with bcrypt password hashing
- **Type Safety**: TypeScript throughout

### Project Structure
```
server/api/auth/       # Authentication API endpoints (login, register)
server/api/inscriptions/  # Registration/enrollment endpoints
prisma/               # Database schema and migrations
app/composables/      # Vue composables for shared logic
app/pages/inscription/ # Multi-step registration flow pages
app/middleware/       # Nuxt middleware (auth protection)
types/                # TypeScript type definitions
```

### Authentication System
- JWT-based authentication with 7-day expiration
- Passwords hashed with bcrypt (salt rounds: 10)
- User registration and login endpoints at `/api/auth/`
- Auth composable at `app/composables/useAuth.ts` manages authentication state
- Uses cookies for token and user data persistence

### Password Reset
- Pages: `/forgot-password` (demande) et `/reset-password?token=...` (nouveau mot de passe)
- Endpoints: `POST /api/auth/forgot-password`, `GET /api/auth/verify-reset-token`, `POST /api/auth/reset-password`
- Table `password_reset_tokens` : seul le **hash SHA-256** du token est stocké, le token en clair ne circule que dans l'email
- Lien valable **1 heure**, à usage unique ; une nouvelle demande invalide les liens précédents
- `/api/auth/forgot-password` répond **toujours** la même chose (compte existant ou non, panne SMTP incluse) pour ne pas permettre d'énumérer les comptes — en cas d'échec d'envoi, l'erreur part dans les logs PM2
- Rate limiting : 5 demandes/heure/IP, 10 validations de token/15 min/IP (`server/utils/rateLimiter.ts`)
- Le nouveau mot de passe passe par `validatePassword()` — attention, les mots de passe commençant par `test`, `admin`, `password`, `azerty`, `qwerty` sont refusés

### Pièges connus
- **L'alias `~/` pointe sur `app/`, pas sur la racine.** `import ... from '~/server/utils/x'` résout donc vers `app/server/utils/x.ts` (le dossier dupliqué), pas vers `server/utils/x.ts` qui est celui réellement utilisé par Nitro. Pour les fichiers de `server/`, utiliser des **imports relatifs** (`../../utils/x`).
- Les tables MySQL sont en **MyISAM** : aucune clé étrangère possible, les relations Prisma sont purement applicatives.
- `prisma migrate status` est désynchronisé (migrations jamais enregistrées) — appliquer les migrations à la main avec `mysql < prisma/migrations/<dossier>/migration.sql`, puis `npx prisma generate`.

### Database Schema
Main entities in MySQL database:
- **User**: Authentication and admin users
- **Dancer**: Students/participants with personal info
- **DanceGroup**: Available dance classes/groups
- **Registration**: Links dancers to dance groups with status tracking
- **guardians**: Legal guardians for minors
- **EmergencyContact**: Emergency contact information

### Multi-Step Registration Flow
Located in `app/pages/inscription/`:
- `step-1.vue`: Personal information collection
- `step-2.vue`: Dance group selection
- `step-3.vue`: Emergency contacts and guardian info
- `step-4.vue`: Review and submission
- `success.vue`: Registration confirmation

### Environment Configuration
Required environment variables:
- `DATABASE_URL`: MySQL connection string
- `JWT_SECRET`: Secret key for JWT token signing
- `APP_URL`: URL publique du site (construction des liens de réinitialisation) — `https://square630.andyvie.fr`
- `SMTP_HOST` / `SMTP_PORT` / `SMTP_SECURE` / `SMTP_USER` / `SMTP_PASS`: envoi des emails (boîte OVH mutualisée `contact@recreo.fr`)
- `EMAIL_FROM` / `EMAIL_FROM_NAME`: expéditeur affiché (`Square630 <contact@recreo.fr>`)

### Development Notes
- French language used throughout (error messages, UI text, comments)
- Nuxt auto-imports enabled for composables and utilities
- Uses Nuxt's file-based routing system
- API endpoints use defineEventHandler pattern
- Frontend uses animated gradients with orange/red color scheme