# Rate Limiting

Protect your API from abuse with built-in rate limiting.

## Overview

bootnode includes rate limiting to prevent abuse:

- **General API**: 100 requests per 15 minutes
- **Authentication endpoints**: 10 requests per 15 minutes

## Default Configuration

### General Rate Limiter

Located in `src/app.js`:

```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests, please try again later'
  },
  standardHeaders: true,
  legacyHeaders: false
});

app.use('/api', limiter);
```

### Auth Rate Limiter

More restrictive for auth endpoints in `src/routes/auth.routes.js`:

```javascript
import { authLimiter } from '../middleware/rateLimiter.js';
router.use(authLimiter);
```

## Customizing Rate Limits

### Environment Variables

```env
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes in ms
RATE_LIMIT_MAX=100            # requests per window
```

### Custom Per-Route Limiter

Add rate limiting to specific routes:

```javascript
import rateLimit from 'express-rate-limit';

const specialLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // 5 requests per minute
  message: {
    success: false,
    message: 'Too many requests from this IP'
  }
});

app.use('/api/special', specialLimiter);
```

## Rate Limit Headers

Each response includes rate limit information:

| Header | Description |
|--------|-------------|
| `RateLimit-Limit` | Maximum requests allowed |
| `RateLimit-Remaining` | Remaining requests in window |
| `RateLimit-Reset` | Seconds until window resets |

Example:
```
RateLimit-Limit: 100
RateLimit-Remaining: 95
RateLimit-Reset: 1640000000
```

## Skipping Rate Limiting

### For Specific IPs

```javascript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  skip: (req, res) => {
    const whitelist = ['127.0.0.1', '::1'];
    return whitelist.includes(req.ip);
  }
});
```

### Skip Successful Requests

```javascript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  skipSuccessfulRequests: true // only count failed requests
});
```

## Best Practices

1. **Start conservative** - Default limits work for most cases
2. **Monitor** - Watch for legitimate users hitting limits
3. **Document** - Let API consumers know the limits
4. **Return helpful headers** - Clients can adapt to limits
5. **Test thoroughly** - Ensure limits don't block valid traffic

## Troubleshooting

### Legitimate Users Blocked

Increase limits or implement per-user limiting:

```javascript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  keyGenerator: (req) => req.user.id // rate limit per user, not IP
});
```

### Behind Proxy

If behind a load balancer/proxy:

```javascript
app.set('trust proxy', 1); // Express will use X-Forwarded-For
```
