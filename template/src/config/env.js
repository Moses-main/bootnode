const requiredEnvByMode = {
  default: ['MONGO_URI', 'JWT_SECRET', 'REFRESH_TOKEN_SECRET']
};

export const validateEnv = () => {
  if (process.env.NODE_ENV === 'test') {
    return;
  }

  const missing = requiredEnvByMode.default.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}. ` +
        'Copy .env.example to .env and provide the required values.'
    );
  }
};
