# HashiCorp Vault Integration

This project includes integration with HashiCorp Vault for secure secrets management. The integration allows you to fetch environment variables from Vault and automatically generate your `.env` file.

## Setup

### 1. Install Dependencies

The required `node-vault` dependency is already installed in the project.

### 2. Configure Vault Connection

Set the following environment variables for Vault connection:

```bash
# Required
VAULT_ENDPOINT=http://localhost:8200  # Your Vault server endpoint
VAULT_AUTH_METHOD=token               # Authentication method: token, userpass, or approle

# For token authentication (recommended for development)
VAULT_TOKEN=your_vault_token

# For userpass authentication
VAULT_USERNAME=your_vault_username
VAULT_PASSWORD=your_vault_password

# For approle authentication
VAULT_ROLE_ID=your_vault_role_id
VAULT_SECRET_ID=your_vault_secret_id
```

### 3. Vault Secret Structure

The script expects secrets to be stored in the following paths in Vault:

```
secret/sync-playlist/database
├── DATABASE_URL

secret/sync-playlist/auth
├── BETTER_AUTH_SECRET
├── BETTER_AUTH_URL
└── BETTER_AUTH_TELEMETRY_DEBUG

secret/sync-playlist/google
├── GOOGLE_CLIENT_ID
└── GOOGLE_CLIENT_SECRET
```

### 4. Store Secrets in Vault

Use the Vault CLI or UI to store your secrets:

```bash
# Database secrets
vault kv put secret/sync-playlist/database \
  DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"

# Auth secrets
vault kv put secret/sync-playlist/auth \
  BETTER_AUTH_SECRET="your_secret_key" \
  BETTER_AUTH_URL="http://localhost:3000" \
  BETTER_AUTH_TELEMETRY_DEBUG="1"

# Google OAuth secrets
vault kv put secret/sync-playlist/google \
  GOOGLE_CLIENT_ID="your_google_client_id" \
  GOOGLE_CLIENT_SECRET="your_google_client_secret"
```

## Usage

### Generate .env from Vault

Run the following command to fetch secrets from Vault and generate your `.env` file:

```bash
npm run vault:env
```

This command will:

1. Authenticate with your Vault server
2. Fetch secrets from the configured paths
3. Generate a new `.env` file with the fetched values
4. Backup any existing `.env` file before overwriting

### Manual Script Execution

You can also run the script directly:

```bash
node scripts/vault-env.js
```

## Authentication Methods

### Token Authentication (Development)

Set `VAULT_AUTH_METHOD=token` and provide `VAULT_TOKEN`.

### Username/Password Authentication

Set `VAULT_AUTH_METHOD=userpass` and provide `VAULT_USERNAME` and `VAULT_PASSWORD`.

### AppRole Authentication (Production)

Set `VAULT_AUTH_METHOD=approle` and provide `VAULT_ROLE_ID` and `VAULT_SECRET_ID`.

## Security Best Practices

1. **Never commit Vault tokens or credentials to version control**
2. **Use AppRole authentication for production environments**
3. **Rotate tokens and credentials regularly**
4. **Use appropriate Vault policies to limit secret access**
5. **Consider using Vault Agent for automatic token renewal**

## Troubleshooting

### Common Issues

1. **Authentication Failed**
   - Verify your Vault endpoint is accessible
   - Check your authentication credentials
   - Ensure your token/credentials have the necessary permissions

2. **Secrets Not Found**
   - Verify the secret paths exist in Vault
   - Check the secret structure matches the expected format
   - Ensure your credentials have read access to the secret paths

3. **Network Issues**
   - Verify Vault server is running and accessible
   - Check firewall settings
   - Verify SSL/TLS configuration if using HTTPS

### Debug Mode

Set `DEBUG=1` environment variable to see detailed debug information:

```bash
DEBUG=1 npm run vault:env
```

## Integration with Development Workflow

1. **Initial Setup**: Use `npm run copy:env` to create a basic `.env` from the example
2. **Vault Integration**: Use `npm run vault:env` to fetch secrets from Vault
3. **Local Development**: The generated `.env` file works with all existing npm scripts

The script automatically backs up existing `.env` files, so you can safely run it multiple times during development.
