# Environment Variables

Configure your bootnode application using environment variables.

## Required Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/bootnode` |
| `NODE_ENV` | Application environment | `development` |

## Optional Variables

### Rate Limiting

| Variable | Description | Default |
|----------|-------------|---------|
| `RATE_LIMIT_WINDOW_MS` | Rate limiting window in ms | `15 * 60 * 1000` (15 minutes) |
| `RATE_LIMIT_MAX` | Max requests per window | `100` |

### Database

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_CONNECTION_TIMEOUT` | MongoDB connection timeout | `30000` |
| `DB_MAX_POOL_SIZE` | Maximum connection pool size | `10` |

## Example `.env` File

```bash
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/bootnode
DB_CONNECTION_TIMEOUT=30000
DB_MAX_POOL_SIZE=10

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

## Setting Up

1. Copy the example file:

```bash
cp .env.example .env
```

2. Edit `.env` with your values:

```bash
# Using nano
nano .env

# Or VS Code
code .env
```

## Environment-Specific Configuration

### Development

```bash
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/bootnode_dev
```

### Production

```bash
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bootnode_prod
```

## MongoDB Atlas Connection

For MongoDB Atlas, use the connection string provided in Atlas:

```bash
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority
```

Replace `<username>`, `<password>`, `<cluster-url>`, and `<database>` with your Atlas credentials.

## Security Notes

- **Never commit** `.env` to version control
- Add `.env` to `.gitignore`
- Use secret management for production (AWS Secrets Manager, HashiVault, etc.)
- Use strong, unique passwords
- Rotate credentials periodically
