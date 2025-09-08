# Playlist Migration App - Clean Architecture

## 🏗️ Arquitectura General

```
playlist-migration-app/
├── frontend/                    # NextJS App
├── backend/                     # NestJS Main API
├── migration-service/           # NestJS Microservice para migraciones
├── shared/                      # Tipos y utilidades compartidas
└── docker-compose.yml           # Orquestación de servicios
```

## 🌐 Frontend Structure (NextJS + Clean Architecture)

```
frontend/
├── src/
│   ├── app/                     # App Router (NextJS 13+)
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   ├── dashboard/
│   │   │   ├── page.tsx
│   │   │   ├── playlists/
│   │   │   │   └── page.tsx
│   │   │   └── migrations/
│   │   │       ├── page.tsx
│   │   │       ├── [id]/
│   │   │       │   └── page.tsx
│   │   │       └── preview/
│   │   │           └── [id]/
│   │   │               └── page.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   │
│   ├── core/                    # Clean Architecture Core
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   │   ├── User.ts
│   │   │   │   ├── SocialAccount.ts
│   │   │   │   ├── AuthProvider.ts
│   │   │   │   ├── Playlist.ts
│   │   │   │   ├── Song.ts
│   │   │   │   └── Migration.ts
│   │   │   ├── repositories/    # Interfaces
│   │   │   │   ├── IUserRepository.ts
│   │   │   │   ├── ISocialAccountRepository.ts
│   │   │   │   ├── IAuthProviderRepository.ts
│   │   │   │   ├── IPlaylistRepository.ts
│   │   │   │   └── IMigrationRepository.ts
│   │   │   └── services/        # Interfaces
│   │   │       ├── IAuthenticationService.ts
│   │   │       ├── ISocialAuthService.ts
│   │   │       ├── ITokenService.ts
│   │   │       ├── ISpotifyService.ts
│   │   │       ├── IAppleMusicService.ts
│   │   │       └── IMigrationService.ts
│   │   │
│   │   ├── application/         # Use Cases
│   │   │   ├── auth/
│   │   │   │   ├── LoginUseCase.ts
│   │   │   │   └── RegisterUseCase.ts
│   │   │   ├── playlists/
│   │   │   │   ├── GetPlaylistsUseCase.ts
│   │   │   │   └── SyncPlaylistsUseCase.ts
│   │   │   └── migrations/
│   │   │       ├── CreateMigrationUseCase.ts
│   │   │       ├── PreviewMigrationUseCase.ts
│   │   │       ├── ExecuteMigrationUseCase.ts
│   │   │       └── GetMigrationHistoryUseCase.ts
│   │   │
│   │   └── infrastructure/      # Implementaciones
│   │       ├── repositories/
│   │       │   ├── ApiUserRepository.ts
│   │       │   ├── ApiSocialAccountRepository.ts
│   │       │   ├── ApiAuthProviderRepository.ts
│   │       │   ├── ApiPlaylistRepository.ts
│   │       │   └── ApiMigrationRepository.ts
│   │       ├── services/
│   │       │   ├── HttpAuthService.ts
│   │       │   ├── HttpSocialAuthService.ts
│   │       │   ├── HttpTokenService.ts
│   │       │   ├── HttpSpotifyService.ts
│   │       │   ├── HttpAppleMusicService.ts
│   │       │   └── HttpMigrationService.ts
│   │       └── http/
│   │           ├── ApiClient.ts
│   │           └── interceptors/
│   │               └── AuthInterceptor.ts
│   │
│   ├── presentation/            # UI Layer
│   │   ├── components/
│   │   │   ├── ui/              # Shadcn/ui components
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   └── ...
│   │   │   ├── auth/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── RegisterForm.tsx
│   │   │   │   ├── SocialLoginButtons.tsx
│   │   │   │   ├── AccountLinkingCard.tsx
│   │   │   │   └── AuthProviderButton.tsx
│   │   │   ├── playlists/
│   │   │   │   ├── PlaylistCard.tsx
│   │   │   │   ├── PlaylistList.tsx
│   │   │   │   └── ServiceConnection.tsx
│   │   │   ├── migrations/
│   │   │   │   ├── MigrationWizard.tsx
│   │   │   │   ├── SongMapper.tsx
│   │   │   │   ├── MigrationPreview.tsx
│   │   │   │   ├── MigrationProgress.tsx
│   │   │   │   └── MigrationHistory.tsx
│   │   │   └── layout/
│   │   │       ├── Navbar.tsx
│   │   │       ├── Sidebar.tsx
│   │   │       └── Loading.tsx
│   │   │
│   │   ├── hooks/               # Custom Hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── usePlaylists.ts
│   │   │   ├── useMigrations.ts
│   │   │   └── useWebSocket.ts
│   │   │
│   │   └── providers/           # Context Providers
│   │       ├── AuthProvider.tsx
│   │       ├── ThemeProvider.tsx
│   │       └── SocketProvider.tsx
│   │
│   ├── shared/                  # Utilidades
│   │   ├── types/
│   │   │   ├── api.types.ts
│   │   │   └── ui.types.ts
│   │   ├── constants/
│   │   │   └── endpoints.ts
│   │   └── utils/
│   │       ├── validation.ts
│   │       └── formatters.ts
│   │
│   ├── middleware.ts            # NextJS Middleware
│   └── next.config.js
│
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🔧 Backend Main API Structure (NestJS + Clean Architecture)

```
backend/
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   │
│   ├── core/                    # Clean Architecture Core
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   │   ├── user.entity.ts
│   │   │   │   ├── social-account.entity.ts
│   │   │   │   ├── auth-provider.entity.ts
│   │   │   │   ├── playlist.entity.ts
│   │   │   │   ├── song.entity.ts
│   │   │   │   └── migration.entity.ts
│   │   │   ├── repositories/    # Interfaces
│   │   │   │   ├── user.repository.interface.ts
│   │   │   │   ├── social-account.repository.interface.ts
│   │   │   │   ├── auth-provider.repository.interface.ts
│   │   │   │   ├── playlist.repository.interface.ts
│   │   │   │   └── migration.repository.interface.ts
│   │   │   └── services/        # Domain Services Interfaces
│   │   │       ├── authentication.service.interface.ts
│   │   │       ├── social-auth.service.interface.ts
│   │   │       ├── token.service.interface.ts
│   │   │       ├── password-hash.service.interface.ts
│   │   │       ├── music-platform.service.interface.ts
│   │   │       └── migration.service.interface.ts
│   │   │
│   │   ├── application/         # Use Cases
│   │   │   ├── auth/
│   │   │   │   ├── commands/
│   │   │   │   │   ├── register-user.command.ts
│   │   │   │   │   └── login-user.command.ts
│   │   │   │   └── handlers/
│   │   │   │       ├── register-user.handler.ts
│   │   │   │       └── login-user.handler.ts
│   │   │   ├── playlists/
│   │   │   │   ├── commands/
│   │   │   │   │   └── sync-playlists.command.ts
│   │   │   │   ├── queries/
│   │   │   │   │   └── get-playlists.query.ts
│   │   │   │   └── handlers/
│   │   │   │       ├── sync-playlists.handler.ts
│   │   │   │       └── get-playlists.handler.ts
│   │   │   └── migrations/
│   │   │       ├── commands/
│   │   │       │   ├── create-migration.command.ts
│   │   │       │   └── execute-migration.command.ts
│   │   │       ├── queries/
│   │   │       │   ├── get-migration-preview.query.ts
│   │   │       │   └── get-migration-history.query.ts
│   │   │       └── handlers/
│   │   │           ├── create-migration.handler.ts
│   │   │           ├── execute-migration.handler.ts
│   │   │           ├── get-migration-preview.handler.ts
│   │   │           └── get-migration-history.handler.ts
│   │   │
│   │   └── infrastructure/      # Implementaciones
│   │       ├── database/
│   │       │   ├── entities/
│   │       │   │   ├── user.schema.ts
│   │       │   │   ├── social-account.schema.ts
│   │       │   │   ├── auth-provider.schema.ts
│   │       │   │   ├── playlist.schema.ts
│   │       │   │   ├── song.schema.ts
│   │       │   │   └── migration.schema.ts
│   │       │   ├── repositories/
│   │       │   │   ├── user.repository.ts
│   │       │   │   ├── social-account.repository.ts
│   │       │   │   ├── auth-provider.repository.ts
│   │       │   │   ├── playlist.repository.ts
│   │       │   │   └── migration.repository.ts
│   │       │   └── database.module.ts
│   │       ├── external-services/
│   │       │   ├── spotify/
│   │       │   │   ├── spotify.service.ts
│   │       │   │   ├── spotify.adapter.ts
│   │       │   │   └── spotify.module.ts
│   │       │   ├── apple-music/
│   │       │   │   ├── apple-music.service.ts
│   │       │   │   ├── apple-music.adapter.ts
│   │       │   │   └── apple-music.module.ts
│   │       │   └── factory/
│   │       │       └── music-platform.factory.ts
│   │       ├── auth/
│   │       │   ├── strategies/
│   │       │   │   ├── jwt.strategy.ts
│   │       │   │   ├── local.strategy.ts
│   │       │   │   ├── google.strategy.ts
│   │       │   │   ├── facebook.strategy.ts
│   │       │   │   ├── twitter.strategy.ts
│   │       │   │   ├── github.strategy.ts
│   │       │   │   └── discord.strategy.ts
│   │       │   ├── services/
│   │       │   │   ├── authentication.service.ts
│   │       │   │   ├── social-auth.service.ts
│   │       │   │   ├── token.service.ts
│   │       │   │   ├── password-hash.service.ts
│   │       │   │   └── oauth-callback.service.ts
│   │       │   ├── guards/
│   │       │   │   ├── jwt-auth.guard.ts
│   │       │   │   ├── local-auth.guard.ts
│   │       │   │   ├── google-auth.guard.ts
│   │       │   │   ├── facebook-auth.guard.ts
│   │       │   │   ├── twitter-auth.guard.ts
│   │       │   │   ├── github-auth.guard.ts
│   │       │   │   └── discord-auth.guard.ts
│   │       │   └── auth.module.ts
│   │       ├── messaging/
│   │       │   ├── events/
│   │       │   │   ├── migration-started.event.ts
│   │       │   │   ├── migration-completed.event.ts
│   │       │   │   └── migration-failed.event.ts
│   │       │   ├── producers/
│   │       │   │   └── migration.producer.ts
│   │       │   └── messaging.module.ts
│   │       └── websocket/
│   │           ├── migration.gateway.ts
│   │           └── websocket.module.ts
│   │
│   ├── presentation/            # Controllers
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts
│   │   │   ├── playlists.controller.ts
│   │   │   └── migrations.controller.ts
│   │   ├── dto/
│   │   │   ├── auth/
│   │   │   │   ├── register-user.dto.ts
│   │   │   │   └── login-user.dto.ts
│   │   │   ├── playlists/
│   │   │   │   └── sync-playlists.dto.ts
│   │   │   └── migrations/
│   │   │       ├── create-migration.dto.ts
│   │   │       ├── migration-preview.dto.ts
│   │   │       └── song-mapping.dto.ts
│   │   ├── guards/
│   │   │   ├── auth.guard.ts
│   │   │   └── roles.guard.ts
│   │   ├── decorators/
│   │   │   └── current-user.decorator.ts
│   │   └── filters/
│   │       └── http-exception.filter.ts
│   │
│   ├── shared/
│       ├── config/
│       │   ├── database.config.ts
│       │   ├── auth.config.ts
│       │   ├── oauth.config.ts
│       │   ├── jwt.config.ts
│       │   ├── spotify.config.ts
│       │   ├── apple-music.config.ts
│       │   └── redis.config.ts
│       ├── enums/
│       │   ├── auth-provider.enum.ts
│       │   ├── social-platform.enum.ts
│       │   ├── account-linking-status.enum.ts
│       │   ├── music-platform.enum.ts
│       │   └── migration-status.enum.ts
│       ├── interfaces/
│       │   └── common.interfaces.ts
│       └── utils/
│           ├── validators.ts
│           └── transformers.ts
│
├── test/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── package.json
├── tsconfig.json
├── nest-cli.json
└── README.md
```

## 🔄 Migration Service Structure (NestJS Microservice)

```
migration-service/
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   │
│   ├── core/
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   │   ├── migration-job.entity.ts
│   │   │   │   ├── song-match.entity.ts
│   │   │   │   └── migration-result.entity.ts
│   │   │   ├── repositories/
│   │   │   │   └── migration-job.repository.interface.ts
│   │   │   └── services/
│   │   │       ├── song-matching.service.interface.ts
│   │   │       └── migration-executor.service.interface.ts
│   │   │
│   │   ├── application/
│   │   │   ├── commands/
│   │   │   │   ├── process-migration.command.ts
│   │   │   │   └── retry-failed-songs.command.ts
│   │   │   ├── queries/
│   │   │   │   └── get-migration-status.query.ts
│   │   │   └── handlers/
│   │   │       ├── process-migration.handler.ts
│   │   │       ├── retry-failed-songs.handler.ts
│   │   │       └── get-migration-status.handler.ts
│   │   │
│   │   └── infrastructure/
│   │       ├── messaging/
│   │       │   ├── consumers/
│   │       │   │   └── migration.consumer.ts
│   │       │   ├── producers/
│   │       │   │   └── migration-status.producer.ts
│   │       │   └── messaging.module.ts
│   │       ├── services/
│   │       │   ├── song-matching.service.ts
│   │       │   ├── migration-executor.service.ts
│   │       │   └── retry.service.ts
│   │       └── database/
│   │           ├── entities/
│   │           │   └── migration-job.schema.ts
│   │           └── repositories/
│   │               └── migration-job.repository.ts
│   │
│   ├── presentation/
│   │   └── controllers/
│   │       └── migration.controller.ts
│   │
│   └── shared/
│       ├── config/
│       │   └── queue.config.ts
│       └── utils/
│           ├── song-similarity.utils.ts
│           └── retry.utils.ts
│
├── package.json
├── tsconfig.json
└── README.md
```

## 📋 Shared Types

```
shared/
├── types/
│   ├── entities/
│   │   ├── user.types.ts
│   │   ├── playlist.types.ts
│   │   ├── song.types.ts
│   │   └── migration.types.ts
│   ├── enums/
│   │   ├── music-platform.enum.ts
│   │   ├── migration-status.enum.ts
│   │   └── song-match-confidence.enum.ts
│   └── api/
│       ├── requests.types.ts
│       └── responses.types.ts
├── utils/
│   ├── validation.utils.ts
│   └── transformation.utils.ts
└── constants/
    ├── api-endpoints.ts
    └── error-messages.ts
```

## 🚀 Flujo Principal de Migración

### 1. Autenticación y Conexión

```
Usuario → Login → Dashboard → Conectar Servicios (Spotify/Apple Music)
```

### 2. Selección de Playlist

```
Dashboard → Ver Playlists → Seleccionar Playlist Origen → Elegir Destino
```

### 3. Preview y Mapping

```
Crear Migración → Análisis de Canciones → Preview con Matches →
Usuario Corrige/Mapea → Confirma Migración
```

### 4. Ejecución Asíncrona

```
Backend → Envía Job a Cola → Migration Service → Procesa Canciones →
WebSocket Updates → Notifica Completado
```

## 🔧 Ejemplo de Código - Migration Use Case

```typescript
// backend/src/core/application/migrations/handlers/create-migration.handler.ts
@CommandHandler(CreateMigrationCommand)
export class CreateMigrationHandler
  implements ICommandHandler<CreateMigrationCommand>
{
  constructor(
    private readonly migrationRepo: IMigrationRepository,
    private readonly musicPlatformFactory: MusicPlatformFactory,
    private readonly migrationProducer: MigrationProducer,
  ) {}

  async execute(command: CreateMigrationCommand): Promise<Migration> {
    const { userId, sourcePlaylistId, targetPlatform } = command;

    // 1. Obtener playlist origen
    const sourcePlatform = await this.detectSourcePlatform(sourcePlaylistId);
    const sourceService = this.musicPlatformFactory.create(sourcePlatform);
    const playlist = await sourceService.getPlaylist(sourcePlaylistId);

    // 2. Crear migración
    const migration = Migration.create({
      userId,
      sourcePlaylist: playlist,
      sourcePlatform,
      targetPlatform,
      status: MigrationStatus.PREVIEW,
    });

    // 3. Generar preview de matches
    const targetService = this.musicPlatformFactory.create(targetPlatform);
    const songMatches = await this.generateSongMatches(
      playlist.songs,
      targetService,
    );
    migration.setSongMatches(songMatches);

    // 4. Guardar y retornar para preview
    return await this.migrationRepo.save(migration);
  }
}
```

## 📊 Base de Datos

### Principales Entidades:

- **Users**: Información del usuario y tokens de autenticación
- **Playlists**: Metadata de playlists sincronizadas
- **Songs**: Canciones con información normalizada
- **Migrations**: Registro de migraciones con estado y resultados
- **SongMatches**: Matches encontrados con confianza

### Sistema de Colas:

- **Redis** para colas de trabajos
- **BullMQ** para procesamiento robusto
- **WebSocket** para actualizaciones en tiempo real

## 🔐 Sistema de Autenticación Multi-Provider

### Proveedores Soportados:

- **Email/Password**: Autenticación tradicional con hash seguro
- **Google**: OAuth 2.0 con Google Identity
- **Facebook**: Facebook Login API
- **Twitter/X**: Twitter OAuth 2.0
- **GitHub**: GitHub OAuth Apps
- **Discord**: Discord OAuth2
- **Spotify**: OAuth directo (útil para migración)
- **Apple**: Sign in with Apple (futuro)

### Arquitectura de Autenticación:

```typescript
// Estrategia de múltiples proveedores
interface AuthProvider {
  id: string;
  name: string;
  type: 'oauth' | 'email' | 'social';
  clientId: string;
  scopes: string[];
  enabled: boolean;
}

// Cuenta social vinculada
interface SocialAccount {
  id: string;
  userId: string;
  provider: AuthProvider;
  providerId: string;
  email?: string;
  accessToken: string;
  refreshToken?: string;
  expiresAt?: Date;
  linkedAt: Date;
}
```

### Flujos de Autenticación:

#### 1. **Registro/Login Email**

```
Usuario → Formulario → Validación → Hash Password → JWT Token
```

#### 2. **Login Social OAuth**

```
Usuario → Botón Social → Redirect OAuth → Callback →
Buscar/Crear Usuario → Vincular Cuenta → JWT Token
```

#### 3. **Vinculación de Cuentas**

```
Usuario Logueado → Conectar Social → OAuth Flow →
Vincular a Cuenta Existente → Actualizar Permisos
```

### Consideraciones Importantes:

#### 🔑 **Seguridad**

- **JWT con refresh tokens** para sesiones seguras
- **Rate limiting** en endpoints de auth
- **CSRF protection** en OAuth callbacks
- **Sanitización** de datos de proveedores sociales
- **Validación robusta** de tokens OAuth

#### 🔗 **Vinculación de Cuentas**

- **Detección de duplicados** por email
- **Merge de cuentas** automático/manual
- **Resolución de conflictos** entre proveedores
- **Desvinculación segura** de cuentas sociales

#### 📱 **Experiencia de Usuario**

- **Single Sign-On** entre proveedores
- **Fallback graceful** si provider falla
- **Gestión de permisos** granular por provider
- **Onboarding intuitivo** para nuevos usuarios

#### ⚙️ **Configuración Flexible**

- **Habilitación/deshabilitación** de proveedores por entorno
- **Configuración por variables** de entorno
- **Scopes dinámicos** según necesidades
- **Callback URLs** configurables

#### 🚀 **Integración con Playlists**

- **Auto-conexión** si usuario se autentica con Spotify
- **Permisos automáticos** para lectura de playlists
- **Refresh automático** de tokens antes de migración
- **Múltiples cuentas** del mismo servicio (Spotify personal/trabajo)

### Base de Datos Extendida:

#### **Tabla Users**

```sql
- id, email, password_hash, email_verified
- created_at, updated_at, last_login_at
- primary_auth_provider, account_status
```

#### **Tabla Social_Accounts**

```sql
- id, user_id, provider_id, provider_user_id
- access_token, refresh_token, expires_at
- scopes, profile_data, linked_at
```

#### **Tabla Auth_Providers**

```sql
- id, name, type, client_id, enabled
- scopes, auth_url, token_url, user_info_url
```

### Middleware y Guards:

#### **Autenticación**

- `JwtAuthGuard`: Validación de JWT tokens
- `SocialAuthGuards`: Por cada proveedor OAuth
- `MultiProviderGuard`: Acepta múltiples tipos de auth

#### **Autorización**

- `LinkedAccountGuard`: Verifica cuentas vinculadas necesarias
- `ScopeGuard`: Valida permisos específicos por provider
- `PlatformAccessGuard`: Acceso a servicios de música

Esta arquitectura te permitirá:

- ✅ **Flexibilidad total** para agregar nuevos proveedores
- ✅ **Experiencia unificada** independiente del método de login
- ✅ **Seguridad robusta** con mejores prácticas OAuth
- ✅ **Gestión centralizada** de identidades y permisos
- ✅ **Escalabilidad** para millones de usuarios

¿Te gustaría que profundice en alguna parte específica de la arquitectura?
