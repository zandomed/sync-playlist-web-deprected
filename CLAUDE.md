# CLAUDE.md - PlaylistSync Frontend Application

## 🎯 Project Overview

**PlaylistSync** is a modern SaaS application that enables users to seamlessly migrate playlists between music streaming platforms (Spotify ↔ Apple Music). The frontend is built with **Next.js 15+**, **TypeScript**, **Tailwind CSS**, and **Shadcn/UI**, following **Clean Architecture** principles.

## 🏗️ Architecture & Tech Stack

### Core Technologies

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn/UI components
- **State Management**: Zustand for global state + React Context for local state
- **HTTP Client**: Fetch API with custom interceptors
- **Real-time**: WebSocket for migration progress
- **Authentication**: JWT-based with backend OAuth (NestJS + Passport)

### Architecture Pattern

```
src/
├── app/                     # Next.js App Router
├── core/                    # Clean Architecture Core
│   ├── domain/             # Entities & Interfaces
│   ├── application/        # Use Cases
│   └── infrastructure/     # Implementations
├── presentation/           # UI Components & Hooks
├── stores/                 # Zustand Global State Stores
├── shared/                 # Utilities & Constants
└── middleware.ts           # Authentication & Route Guards
```

## 🎨 Design System

### Component Library

- **Shadcn/UI** for consistent, accessible components
- **Lucide React** for icons
- **Custom branded components** with pink gradient accents
- **Responsive design** with mobile-first approach

## 🔐 Authentication System

### Multi-Provider Authentication (Backend Managed)

```typescript
// Backend handles OAuth with Passport.js
const authProviders = [
  'email', // Email/Password
  'google', // Google OAuth
  'facebook', // Facebook Login
  'github', // GitHub OAuth
  'discord', // Discord OAuth
  'spotify', // Spotify OAuth (auto-link for migrations)
  'apple', // Apple Sign In (planned)
];

// Frontend authentication flow
const authFlow = {
  social: 'Frontend → Backend OAuth → Callback → JWT Token',
  email: 'Frontend Form → Backend Validation → JWT Token',
  storage: 'JWT stored in localStorage',
  api: 'Bearer token in Authorization header',
};
```

### Authentication Flow

1. **Social OAuth** → Frontend redirects to backend → Passport handles OAuth → Backend callback with JWT
2. **Email/Password** → Frontend form → Backend validation → JWT Token
3. **Account Linking** → Backend manages multiple social accounts per user
4. **Token Management** → Backend handles refresh tokens, frontend only manages JWT

## 🎵 Core Features & User Flows

### 1. Landing Page

- **Hero Section** with gradient CTA
- **Feature showcase** with animations
- **Social proof** and testimonials
- **Pricing plans** with popular plan highlighted
- **FAQ section** with collapsible answers

### 2. Authentication Pages

```
/auth/
├── signin              # Multi-provider login (redirects to backend)
├── signup              # Registration with email
├── callback            # OAuth callback handler (receives JWT from backend)
└── link-account        # Account linking flow
```

### 3. Dashboard & Main App

```
/dashboard/
├── overview            # User stats and quick actions
├── playlists/          # Connected platform playlists
├── migrations/         # Migration history and management
│   ├── new            # Migration wizard
│   ├── [id]           # Migration details
│   └── preview/[id]   # Song matching preview
└── settings/          # Account and integrations
```

### 4. Migration Wizard Flow

```
Step 1: Platform Connection
├── Connect Spotify Account
├── Connect Apple Music Account
└── Verify Permissions

Step 2: Source Selection
├── Select Source Platform
├── Choose Source Playlist
└── Preview Playlist Content

Step 3: Destination Setup
├── Choose Destination Platform
├── Select: New Playlist vs Existing
├── Configure Playlist Settings
└── Set Migration Mode (append/replace)

Step 4: Song Matching & Preview
├── AI-Generated Song Matches
├── Confidence Score Display
├── Manual Correction Interface
├── Bulk Actions (approve/reject)
└── Match Statistics

Step 5: Migration Execution
├── Real-time Progress Bar
├── WebSocket Progress Updates
├── Batch Processing Status
├── Error Handling & Retry
└── Completion Summary
```

## 📁 Detailed File Structure

### App Router Structure

```
src/app/
├── (auth)/                 # Auth route group
│   ├── signin/
│   │   └── page.tsx
│   ├── signup/
│   │   └── page.tsx
│   └── callback/
│       └── page.tsx    # Single callback page for all providers
├── dashboard/              # Protected routes
│   ├── layout.tsx         # Dashboard layout
│   ├── page.tsx           # Dashboard home
│   ├── playlists/
│   │   ├── page.tsx
│   │   └── [platform]/
│   │       └── page.tsx
│   ├── migrations/
│   │   ├── page.tsx       # Migration history
│   │   ├── new/
│   │   │   └── page.tsx   # Migration wizard
│   │   ├── [id]/
│   │   │   └── page.tsx   # Migration details
│   │   └── preview/
│   │       └── [id]/
│   │           └── page.tsx
│   └── settings/
│       ├── page.tsx
│       ├── account/
│       │   └── page.tsx
│       └── integrations/
│           └── page.tsx
├── layout.tsx             # Root layout
├── page.tsx               # Landing page
├── globals.css            # Global styles
└── loading.tsx            # Global loading UI
```

### Core Domain Layer

```
src/core/domain/
├── entities/
│   ├── User.ts
│   │   interface User {
│   │     id: string;
│   │     email: string;
│   │     name: string;
│   │     avatar?: string;
│   │     socialAccounts: SocialAccount[];
│   │     createdAt: Date;
│   │   }
│   ├── SocialAccount.ts
│   │   interface SocialAccount {
│   │     id: string;
│   │     provider: AuthProvider;
│   │     providerId: string;
│   │     accessToken: string;
│   │     refreshToken?: string;
│   │     expiresAt?: Date;
│   │   }
│   ├── Playlist.ts
│   │   interface Playlist {
│   │     id: string;
│   │     name: string;
│   │     description?: string;
│   │     platform: MusicPlatform;
│   │     trackCount: number;
│   │     isPublic: boolean;
│   │     imageUrl?: string;
│   │     songs: Song[];
│   │   }
│   ├── Song.ts
│   │   interface Song {
│   │     id: string;
│   │     title: string;
│   │     artist: string;
│   │     album: string;
│   │     duration: number;
│   │     isrc?: string;
│   │     platformUrl: string;
│   │   }
│   └── Migration.ts
│       interface Migration {
│         id: string;
│         userId: string;
│         sourcePlaylist: Playlist;
│         targetPlaylist?: Playlist;
│         songMappings: SongMapping[];
│         status: MigrationStatus;
│         progress: number;
│         createdAt: Date;
│         completedAt?: Date;
│       }
├── repositories/
│   ├── IUserRepository.ts
│   ├── IPlaylistRepository.ts
│   ├── ISocialAccountRepository.ts
│   └── IMigrationRepository.ts
└── services/
    ├── IAuthenticationService.ts
    ├── ISpotifyService.ts
    ├── IAppleMusicService.ts
    └── IMigrationService.ts
```

### Application Layer (Use Cases)

```
src/core/application/
├── auth/
│   ├── LoginUseCase.ts
│   │   class LoginUseCase {
│   │     async execute(email: string, password: string): Promise<AuthResult>
│   │   }
│   ├── SocialLoginUseCase.ts
│   │   class SocialLoginUseCase {
│   │     async execute(provider: AuthProvider, code: string): Promise<AuthResult>
│   │   }
│   └── LinkAccountUseCase.ts
│       class LinkAccountUseCase {
│         async execute(userId: string, provider: AuthProvider): Promise<void>
│       }
├── playlists/
│   ├── GetPlaylistsUseCase.ts
│   │   class GetPlaylistsUseCase {
│   │     async execute(userId: string, platform: MusicPlatform): Promise<Playlist[]>
│   │   }
│   └── SyncPlaylistsUseCase.ts
│       class SyncPlaylistsUseCase {
│         async execute(userId: string, platform: MusicPlatform): Promise<void>
│       }
└── migrations/
    ├── CreateMigrationUseCase.ts
    │   class CreateMigrationUseCase {
    │     async execute(request: CreateMigrationRequest): Promise<Migration>
    │   }
    ├── PreviewMigrationUseCase.ts
    │   class PreviewMigrationUseCase {
    │     async execute(migrationId: string): Promise<SongMapping[]>
    │   }
    ├── ExecuteMigrationUseCase.ts
    │   class ExecuteMigrationUseCase {
    │     async execute(migrationId: string): Promise<void>
    │   }
    └── GetMigrationHistoryUseCase.ts
        class GetMigrationHistoryUseCase {
          async execute(userId: string): Promise<Migration[]>
        }

# Note: Use Cases integrate with Zustand stores to update global state
```

### Infrastructure Layer

```
src/core/infrastructure/
├── repositories/
│   ├── ApiUserRepository.ts      # HTTP-based user operations
│   ├── ApiPlaylistRepository.ts  # HTTP-based playlist operations
│   └── ApiMigrationRepository.ts # HTTP-based migration operations
├── services/
│   ├── HttpAuthService.ts        # Authentication API calls
│   ├── HttpSpotifyService.ts     # Spotify Web API integration
│   ├── HttpAppleMusicService.ts  # Apple Music API integration
│   └── HttpMigrationService.ts   # Migration service communication
└── http/
    ├── ApiClient.ts              # Base HTTP client
    ├── interceptors/
    │   ├── AuthInterceptor.ts    # JWT token handling
    │   └── ErrorInterceptor.ts   # Global error handling
    └── endpoints.ts              # API endpoint constants
```

### Presentation Layer

```
src/presentation/
├── components/
│   ├── ui/                       # Shadcn/UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── sheet.tsx
│   │   ├── badge.tsx
│   │   └── collapsible.tsx
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   │   - Email/password form with validation
│   │   │   - Form state management with error handling
│   │   ├── SocialLoginButtons.tsx
│   │   │   - OAuth provider redirect buttons
│   │   │   - Direct backend redirection (window.location.href)
│   │   │   - Loading states and provider-specific styling
│   │   ├── AuthCallback.tsx
│   │   │   - Handles OAuth callback from backend
│   │   │   - Processes JWT token from query params
│   │   │   - Redirects to dashboard or error page
│   │   └── AccountLinkingCard.tsx
│   │       - Connected accounts display
│   │       - Link/unlink functionality via backend
│   │       - Permission status indicators
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   │   - Responsive navigation
│   │   │   - User menu dropdown
│   │   │   - Mobile hamburger menu
│   │   ├── Sidebar.tsx
│   │   │   - Dashboard navigation
│   │   │   - Active route highlighting
│   │   │   - Collapsible design
│   │   └── Footer.tsx
│   │       - Landing page footer
│   │       - Link organization
│   ├── playlists/
│   │   ├── PlaylistCard.tsx
│   │   │   - Playlist preview with image
│   │   │   - Track count and metadata
│   │   │   - Platform badges
│   │   ├── PlaylistList.tsx
│   │   │   - Grid/list view toggle
│   │   │   - Search and filter
│   │   │   - Pagination support
│   │   └── PlatformConnection.tsx
│   │       - OAuth connection flow
│   │       - Connection status display
│   │       - Reconnection handling
│   └── migrations/
│       ├── MigrationWizard.tsx
│       │   - Multi-step form
│       │   - Progress indicator
│       │   - Step validation
│       ├── PlaylistDestinationSelector.tsx
│       │   - New vs existing playlist choice
│       │   - Playlist configuration form
│       │   - Mode selection (append/replace)
│       ├── SongMapper.tsx
│       │   - Song matching interface
│       │   - Confidence score display
│       │   - Manual correction tools
│       ├── MigrationPreview.tsx
│       │   - Final review before execution
│       │   - Match statistics
│       │   - Estimated processing time
│       ├── MigrationProgress.tsx
│       │   - Real-time progress bar
│       │   - WebSocket integration
│       │   - Batch processing status
│       └── MigrationHistory.tsx
│           - Past migration list
│           - Status filtering
│           - Retry failed migrations
├── hooks/
│   ├── useAuth.ts
│   │   - Authentication state management (JWT-based)
│   │   - Login/logout functions
│   │   - Token storage in localStorage
│   │   - User profile management
│   ├── usePlaylists.ts
│   │   - Playlist data fetching
│   │   - Platform filtering
│   │   - Sync operations
│   ├── useMigrations.ts
│   │   - Migration CRUD operations
│   │   - Status polling
│   │   - History management
│   └── useWebSocket.ts
│       - Real-time connection management
│       - Migration progress updates
│       - Connection retry logic
└── providers/
    ├── AuthProvider.tsx          # JWT-based authentication context
    ├── ThemeProvider.tsx         # Dark/light theme
    └── SocketProvider.tsx        # WebSocket context
```

## 🔧 **Zustand State Management**

### **Store Architecture**

```typescript
// Global state structure
interface AppState {
  auth: AuthState; // User authentication and profile
  playlists: PlaylistState; // Music platform playlists
  migrations: MigrationState; // Migration operations and history
  ui: UIState; // UI preferences and notifications
}

// Individual store pattern
const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: localStorage.getItem('auth-token'),
  isAuthenticated: false,
  isLoading: false,

  login: async (token: string) => {
    set({ isLoading: true });
    localStorage.setItem('auth-token', token);
    // Verify token and set user
    const user = await verifyToken(token);
    set({ user, token, isAuthenticated: true, isLoading: false });
  },

  logout: () => {
    localStorage.removeItem('auth-token');
    set({ user: null, token: null, isAuthenticated: false });
  },
}));
```

### **Store Integration with Use Cases**

```typescript
// Use Cases update Zustand stores directly
class GetPlaylistsUseCase {
  constructor(private playlistStore: PlaylistStore) {}

  async execute(platform: MusicPlatform): Promise<void> {
    this.playlistStore.setLoading(true);
    try {
      const playlists = await this.playlistRepository.getByPlatform(platform);
      this.playlistStore.setPlaylists(platform, playlists);
    } catch (error) {
      this.playlistStore.setError(error.message);
    } finally {
      this.playlistStore.setLoading(false);
    }
  }
}
```

### **WebSocket Integration**

```typescript
// WebSocket updates Zustand migration store in real-time
const useWebSocket = () => {
  const updateMigrationProgress = useMigrationStore(
    (state) => state.updateProgress,
  );

  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'migration:progress') {
        updateMigrationProgress(data.migrationId, data.progress);
      }
    };
  }, [updateMigrationProgress]);
};
```

### **SSR and Hydration**

```typescript
// Store hydration for Next.js SSR
const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Hydrate stores after client-side mount
    useAuthStore.getState().hydrate();
    usePlaylistStore.getState().hydrate();
    setIsHydrated(true);
  }, []);

  return isHydrated ? children : <Loading />;
};
```

## 🔧 API Integration

```typescript
// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001';

// Authentication Endpoints
const authEndpoints = {
  // OAuth flows (redirects)
  googleAuth: '/auth/google',
  spotifyAuth: '/auth/spotify',
  githubAuth: '/auth/github',

  // Traditional auth
  login: '/auth/login',
  register: '/auth/register',

  // Profile & account management
  profile: '/auth/profile',
  connectedAccounts: '/auth/connected-accounts',
  linkAccount: '/auth/link/:provider',
};

// Main API Endpoints
const endpoints = {
  playlists: {
    getUserPlaylists: '/playlists/user/:platform',
    syncPlaylists: '/playlists/sync/:platform',
    getPlaylistDetails: '/playlists/:platform/:id',
  },
  migrations: {
    create: '/migrations',
    preview: '/migrations/:id/preview',
    execute: '/migrations/:id/execute',
    history: '/migrations/history',
    status: '/migrations/:id/status',
  },
};

// HTTP Client with JWT
class ApiClient {
  async request(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('auth-token');

    return fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    });
  }
}
```

### WebSocket Events

```typescript
// Real-time Migration Updates
interface WebSocketEvents {
  'migration:started': { migrationId: string };
  'migration:progress': {
    migrationId: string;
    progress: number;
    currentBatch: number;
    totalBatches: number;
  };
  'migration:completed': {
    migrationId: string;
    result: MigrationResult;
  };
  'migration:failed': {
    migrationId: string;
    error: string;
  };
}
```

## 🎨 UI/UX Guidelines

### Responsive Design

- **Mobile First**: Design for mobile, enhance for desktop
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Navigation**: Hamburger menu on mobile, full nav on desktop
- **Cards**: Single column on mobile, grid on desktop

### Animation & Interactions

- **Hover Effects**: Subtle shadow and scale changes
- **Loading States**: Skeleton screens and spinners
- **Progress**: Real-time bars and percentage displays
- **Transitions**: Smooth page and component transitions

## 🚀 Development Workflow

### Getting Started

```bash
# Install dependencies (Node.js 18+ required for Next.js 15)
npm install

# Install Zustand for state management
npm install zustand

# Set up environment variables
cp .env.example .env.local

# Run development server with Turbopack
npm run dev --turbo

# Build for production
npm run build

# Run tests
npm run test
```

### Environment Variables

```env
# App Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_WS_URL=ws://localhost:3001

# No OAuth credentials needed in frontend - handled by backend
```

### Code Quality

- **TypeScript**: Strict mode enabled with Zustand type safety
- **ESLint**: Next.js recommended rules + Zustand best practices
- **Prettier**: Consistent code formatting
- **Husky**: Pre-commit hooks for quality checks
- **Zustand DevTools**: State debugging and time-travel

### Commit Standards (Conventional Commits)

All commits must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### Commit Types

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

#### Scope Examples

- **auth**: Authentication system changes
- **ui**: UI component changes
- **api**: API integration changes
- **store**: Zustand store changes
- **migration**: Playlist migration features
- **dashboard**: Dashboard page changes
- **landing**: Landing page changes

#### Commit Examples

```bash
# Feature commits
feat(auth): add Google OAuth integration
feat(migration): implement real-time progress tracking
feat(ui): add dark mode toggle component

# Bug fixes
fix(auth): resolve token expiration handling
fix(migration): fix song matching accuracy issues
fix(ui): correct mobile navigation overflow

# Documentation
docs(readme): update installation instructions
docs(api): add migration endpoint documentation

# Refactoring
refactor(store): optimize playlist state management
refactor(components): extract reusable form components

# Performance
perf(migration): optimize batch processing algorithm
perf(ui): implement virtual scrolling for playlists

# Testing
test(auth): add OAuth flow integration tests
test(migration): add song mapping unit tests

# Chores
chore(deps): update Next.js to v15.1
chore(config): update ESLint configuration
```

#### Breaking Changes

For breaking changes, add `!` after the type and include `BREAKING CHANGE:` in the footer:

```bash
feat(api)!: restructure authentication endpoints

BREAKING CHANGE: Auth endpoints moved from /auth/* to /api/auth/*
```

#### Multi-line Commits

For complex changes, include a detailed body:

```bash
feat(migration): implement smart song matching algorithm

- Add fuzzy string matching for song titles
- Implement ISRC code fallback matching
- Add confidence scoring system
- Include manual review interface for low-confidence matches

Closes #123
```

#### Git Hooks

The project uses Husky and commitlint to enforce these standards:

- **pre-commit**: Runs linting, formatting, and tests
- **commit-msg**: Validates commit message format
- **pre-push**: Runs full test suite

#### CLI Commands

```bash
# Conventional commit helper (if installed)
npm run commit

# Manual commit with proper format
git commit -m "feat(auth): add social login buttons"

# Commit with scope and breaking change
git commit -m "feat(api)!: restructure migration endpoints" -m "BREAKING CHANGE: Migration API now requires authentication"
```

## 📱 Progressive Web App (PWA)

### PWA Features

- **Installable**: Add to home screen functionality
- **Offline Support**: Basic caching for visited pages
- **Push Notifications**: Migration completion alerts
- **Service Worker**: Background sync for pending operations

## 🔒 Security Considerations

### Authentication Security

- **JWT Tokens**: Secure token storage in localStorage
- **Backend OAuth**: All OAuth flows handled by backend with Passport.js
- **No Client Secrets**: OAuth credentials never exposed to frontend
- **Token Validation**: Backend validates and refreshes social tokens
- **Rate Limiting**: Backend handles API rate limiting
- **Input Validation**: Client and server-side validation

### API Security

- **HTTPS Only**: All production API calls over HTTPS
- **Token Refresh**: Automatic token renewal
- **Error Handling**: No sensitive data in error messages
- **CORS**: Proper cross-origin configuration

## 🧪 Testing Strategy

### Test Types

- **Unit Tests**: Component and utility testing with Jest
- **Integration Tests**: API integration testing
- **E2E Tests**: Critical user flow testing with Playwright
- **Visual Tests**: Component visual regression testing

### Key Test Scenarios

- **Authentication Flow**: OAuth redirects, JWT handling, logout
- **Zustand State**: Store actions, state persistence, hydration
- **Migration Wizard**: Complete migration process end-to-end
- **Responsive Design**: Mobile and desktop layouts
- **Error Handling**: Network failures and API errors
- **Token Expiration**: JWT expiry and re-authentication flows
- **Real-time Updates**: WebSocket integration with Zustand stores

## 📈 Performance Optimization

### Next.js 15 Optimizations

- **Turbopack**: Faster builds and dev server with turbo configuration
- **React Compiler**: Automatic optimization with React 19 compiler
- **Image Optimization**: Enhanced Next.js Image component with turbo support
- **Bundle Splitting**: Improved automatic code splitting
- **Server Components**: Enhanced server-side rendering capabilities

### React Optimizations

- **React 19 Features**: Enhanced server components and async components
- **React Compiler**: Automatic memoization and optimization
- **Concurrent Features**: Improved Suspense and streaming
- **Lazy Loading**: Component and route-based code splitting with React.lazy
- **Memoization**: Optimized useMemo and useCallback usage
- **Virtual Scrolling**: For large playlist displays

## 🚀 Deployment & Production

### Production Checklist

- [ ] Environment variables configured
- [ ] Backend OAuth endpoints accessible from production domain
- [ ] API endpoints pointing to production backend
- [ ] Error tracking configured (Sentry)
- [ ] Analytics configured (Google Analytics)
- [ ] Performance monitoring enabled
- [ ] CDN configured for static assets
- [ ] JWT token security settings reviewed

## 📚 Additional Resources

### Documentation Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn/UI Components](https://ui.shadcn.com)
- [Spotify Web API](https://developer.spotify.com/documentation/web-api)
- [Apple Music API](https://developer.apple.com/documentation/applemusicapi)

### Development Tools

- **VS Code Extensions**: ES7 React snippets, Prettier, Eslint, Tailwind IntelliSense
- **Browser Extensions**: React Developer Tools
- **Design Tools**: Figma for design collaboration
- **API Testing**: Bruno for API testing
