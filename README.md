# Sync Playlist Web

## 🎯 Project Overview

**PlaylistSync** is a modern SaaS application that enables users to seamlessly migrate playlists between music streaming platforms (Spotify ↔ Apple Music). The frontend is built with **Next.js 15+**, **TypeScript**, **Tailwind CSS**, and **Shadcn/UI**, following **Clean Architecture** principles.

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- PostgreSQL 17
- Docker

### Installation

1. Clone the repository:

```bash
git clone https://github.com/zandomed/sync-playlist-web.git
cd sync-playlist-web
```

2. Install dependencies:

```bash
npm install
```

3. Install migrations

```
npm run prisma:db:push
```

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Check formatting
- `npm run format:fix` - Fix formatting
- `npm run docker:up` - Start Docker containers
- `npm run docker:down` - Stop Docker containers
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run Prisma migrations
- `npm run prisma:studio` - Open Prisma Studio
- `npm run prisma:db:push` - Push database schema to the database
- `npm run prisma:db:pull` - Pull database schema from the database
- `npm run copy:env` - Copy example environment variables

## Contributing

This project uses conventional commits. Use `npm run commit` to create properly formatted commit messages.

### Commit Types

- **feat**: New feature implementation
- **fix**: Bug fixes
- **docs**: Documentation changes
- **style**: Code style/formatting changes (no logic changes)
- **refactor**: Code refactoring without adding features or fixing bugs
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **build**: Build system or dependency changes
- **ci**: CI/CD configuration changes
- **chore**: Maintenance tasks, tooling updates

All commits must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### Breaking Changes

> [!WARNING]
> For breaking changes, add `!` after the type and include `BREAKING CHANGE:` in the footer:
>
> ```bash
> feat(api)!: restructure authentication endpoints
>
> BREAKING CHANGE: Auth endpoints moved from /auth/* to /api/auth/*
> ```

## Tech Stack

### Core Technologies

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Linting:** ESLint
- **Formatting:** Prettier
- **UI Components:** Shadcn/UI
- **Database:** PostgreSQL with Prisma ORM
- **State Management:** Zustand

### Architecture Pattern

```
src/
├── app/                     # Next.js App Router
│   ├── api/                # Next.js API Routes (Backend)
│   └── (pages)/            # Frontend Pages
├── core/                    # Clean Architecture Core
│   ├── domain/             # Entities & Interfaces
│   ├── application/        # Use Cases
│   └── infrastructure/     # Implementations
├── presentation/           # UI Components & Hooks
├── stores/                 # Zustand Global State Stores
├── shared/                 # Utilities & Constants
├── lib/                    # BetterAuth & Prisma Config
├── prisma/                 # Database Schema & Migrations
└── middleware.ts           # Authentication & Route Guards
```

## Deploy

> [!WARNING] This is a work in progress and not yet ready for production use.

## License

[MIT](https://github.com/zandomed/sync-playlist-web/blob/main/LICENSE)

## 📚 Additional Resources

### Documentation Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn/UI Components](https://ui.shadcn.com)
- [Spotify Web API](https://developer.spotify.com/documentation/web-api)
- [Apple Music API](https://developer.apple.com/documentation/applemusicapi)
