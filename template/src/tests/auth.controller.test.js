import request from 'supertest';
import app from '../app.js';
import { connect, closeDatabase, clearDatabase } from './setup.js';
import User from '../models/user.model.js';

beforeAll(async () => {
  process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-jwt-secret';
  process.env.REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'test-refresh-secret';
  process.env.JWT_EXPIRE = '1h';
  process.env.REFRESH_TOKEN_EXPIRE = '7d';
  await connect();
});

afterEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await closeDatabase();
});

describe('Auth API', () => {
  const testUser = {
    name: 'Auth User',
    email: 'auth@example.com',
    password: 'StrongP@ss1',
  };

  describe('POST /api/auth/register', () => {
    it('should register a new user and return access token', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send(testUser);

      expect(res.statusCode).toEqual(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('accessToken');
      expect(res.body.data.email).toBe(testUser.email);
      expect(res.headers['set-cookie']).toBeDefined();
    });

    it('should reject duplicate email registration', async () => {
      await request(app).post('/api/auth/register').send(testUser);

      const res = await request(app)
        .post('/api/auth/register')
        .send(testUser);

      expect(res.statusCode).toEqual(400);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      await request(app).post('/api/auth/register').send(testUser);

      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: testUser.email, password: testUser.password });

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('accessToken');
      expect(res.headers['set-cookie']).toBeDefined();
    });

    it('should reject invalid credentials', async () => {
      await request(app).post('/api/auth/register').send(testUser);

      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: testUser.email, password: 'WrongP@ss1' });

      expect(res.statusCode).toEqual(401);
    });
  });

  describe('POST /api/auth/refresh-token', () => {
    it('should issue a new access token with valid refresh cookie', async () => {
      await request(app).post('/api/auth/register').send(testUser);

      const loginRes = await request(app)
        .post('/api/auth/login')
        .send({ email: testUser.email, password: testUser.password });

      const cookies = loginRes.headers['set-cookie'];
      const res = await request(app)
        .post('/api/auth/refresh-token')
        .set('Cookie', cookies);

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('accessToken');
    });

    it('should reject when refresh token is missing', async () => {
      const res = await request(app).post('/api/auth/refresh-token');
      expect(res.statusCode).toEqual(401);
    });
  });

  describe('Protected auth endpoints', () => {
    it('should return current user on GET /api/auth/me with bearer token', async () => {
      await request(app).post('/api/auth/register').send(testUser);

      const loginRes = await request(app)
        .post('/api/auth/login')
        .send({ email: testUser.email, password: testUser.password });

      const token = loginRes.body.data.accessToken;
      const meRes = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${token}`);

      expect(meRes.statusCode).toEqual(200);
      expect(meRes.body.success).toBe(true);
      expect(meRes.body.data.email).toBe(testUser.email);
    });

    it('should logout on POST /api/auth/logout with bearer token', async () => {
      await request(app).post('/api/auth/register').send(testUser);

      const loginRes = await request(app)
        .post('/api/auth/login')
        .send({ email: testUser.email, password: testUser.password });

      const token = loginRes.body.data.accessToken;
      const logoutRes = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${token}`);

      expect(logoutRes.statusCode).toEqual(200);
      expect(logoutRes.body.success).toBe(true);

      const user = await User.findOne({ email: testUser.email });
      expect(user.refreshToken).toBeUndefined();
    });
  });
});
