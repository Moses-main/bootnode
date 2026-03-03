# Rate Limiting

bootnode includes built-in rate limiting to protect your API from abuse.

## How It Works

The API implements rate limiting using `express-rate-limit`:

- **100 requests** per **15 minutes** per IP address
- Rate limit headers are included in responses
- Exceeding the limit returns `429 Too Many Requests`

## Rate Limit Headers

Each response includes rate limit information:

| Header | Description |
|--------|-------------|
| `X-RateLimit-Limit` | Maximum requests allowed |
| `X-RateLimit-Remaining` | Remaining requests in window |
| `X-RateLimit-Reset` | Timestamp when window resets |

## Example Headers

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1696339200
```

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `RATE_LIMIT_WINDOW_MS` | Window duration in ms | `900000` (15 min) |
| `RATE_LIMIT_MAX` | Max requests per window | `100` |

### Example Configuration

```bash
# More restrictive
RATE_LIMIT_WINDOW_MS=60000      # 1 minute
RATE_LIMIT_MAX=10               # 10 requests per minute

# Less restrictive
RATE_LIMIT_WINDOW_MS=3600000    # 1 hour
RATE_LIMIT_MAX=1000             # 1000 requests per hour
```

## Customizing Rate Limiter

To customize rate limiting, edit `src/middleware/rateLimiter.js`:

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000,
  max: process.env.RATE_LIMIT_MAX || 100,
  message: {
    success: false,
    message: 'Too many requests, please try again later'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = limiter;
```

## Skipping Successful Requests

To only count failed requests:

```javascript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  skipSuccessfulRequests: true
});
```

## IP Whitelisting

To whitelist certain IPs:

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

## Best Practices

1. **Adjust based on usage** - Monitor and tune limits
2. **Consider user-based limits** - For authenticated APIs
3. **Return helpful headers** - Help clients understand limits
4. **Test thoroughly** - Ensure legitimate traffic isn't blocked
