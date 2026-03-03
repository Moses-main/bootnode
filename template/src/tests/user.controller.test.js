import request from 'supertest';
import app from '../app.js';
import { connect, closeDatabase, clearDatabase } from './setup.js';
import User from '../models/user.model.js';

// Connect to the in-memory database before tests run
beforeAll(async () => {
  process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-jwt-secret';
  process.env.REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'test-refresh-secret';
  process.env.JWT_EXPIRE = '1h';
  process.env.REFRESH_TOKEN_EXPIRE = '7d';
  await connect();
});

// Clear all test data after each test
afterEach(async () => {
  await clearDatabase();
});

// Remove and close the db and server
afterAll(async () => {
  await closeDatabase();
});

describe('User API', () => {
  // Test data
  const testUser = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'StrongP@ss1'
<<<<<<< codex/analyze-codebase-for-project-overview
  };

  const createAdminToken = async () => {
    const adminUser = {
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'StrongP@ss1'
    };

    await request(app).post('/api/auth/register').send(adminUser);
    await User.findOneAndUpdate({ email: adminUser.email }, { role: 'admin' });

    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: adminUser.email, password: adminUser.password });

    return loginRes.body.data.accessToken;
=======
>>>>>>> main
  };

  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const res = await request(app).post('/api/users').send(testUser);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body.name).toBe(testUser.name);
      expect(res.body.email).toBe(testUser.email);
    });

    it('should not create user with duplicate email', async () => {
      // First create a user
      await request(app).post('/api/users').send(testUser);

      // Try to create another user with same email
      const res = await request(app).post('/api/users').send(testUser);

      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toContain('already in use');
    });

    it('should validate user input', async () => {
      const res = await request(app).post('/api/users').send({ email: 'invalid-email' });

      expect(res.statusCode).toEqual(400);
      expect(res.body.errors).toBeDefined();
    });
  });

  describe('GET /api/users', () => {
    it('should support filtering inactive users and custom sorting', async () => {
      await User.create([
        { name: 'Alpha User', email: 'alpha@example.com', password: 'StrongP@ss1' },
        { name: 'Zulu User', email: 'zulu@example.com', password: 'StrongP@ss2' }
      ]);

      const toDeactivate = await User.findOne({ email: 'zulu@example.com' });
      await User.findByIdAndUpdate(toDeactivate._id, { isActive: false });

      const inactiveRes = await request(app)
        .get('/api/users')
        .query({ isActive: false, sortBy: 'name', sortOrder: 'asc' });

      expect(inactiveRes.statusCode).toEqual(200);
      expect(inactiveRes.body.meta.filters.isActive).toBe(false);
      expect(inactiveRes.body.data.every((u) => u.email === 'zulu@example.com')).toBe(true);
      expect(inactiveRes.body.meta.sortBy).toBe('name');
      expect(inactiveRes.body.meta.sortOrder).toBe('asc');
    });
    it('should get all users with pagination', async () => {
      // Create multiple test users
      await User.create([
        { name: 'User 1', email: 'user1@example.com', password: 'StrongP@ss1' },
        { name: 'User 2', email: 'user2@example.com', password: 'StrongP@ss2' },
        { name: 'User 3', email: 'user3@example.com', password: 'StrongP@ss3' }
      ]);

      const res = await request(app).get('/api/users').query({ page: 1, limit: 2 });

      expect(res.statusCode).toEqual(200);
      expect(res.body.data).toHaveLength(2);
      expect(res.body.meta.total).toBe(3);
      expect(res.body.meta.page).toBe(1);
      expect(res.body.meta.limit).toBe(2);
      expect(res.body.meta.totalPages).toBe(2);
    });

    it('should search users by name or email', async () => {
      // Create test users
      await User.create([
        { name: 'John Doe', email: 'john@example.com', password: 'StrongP@ss1' },
        { name: 'Jane Smith', email: 'jane@example.com', password: 'StrongP@ss2' },
        { name: 'Bob Johnson', email: 'bob@example.com', password: 'StrongP@ss3' }
      ]);

      // Search by name
      const resName = await request(app).get('/api/users/search').query({ q: 'John' });

      expect(resName.statusCode).toEqual(200);
<<<<<<< codex/analyze-codebase-for-project-overview
      expect(Array.isArray(resName.body.data)).toBe(true);
      expect(resName.body.data.length).toBeGreaterThanOrEqual(1);
      expect(resName.body.data.some((u) => u.name === 'John Doe')).toBe(true);
      expect(resName.body.meta).toBeDefined();
=======
      expect(resName.body.length).toBeGreaterThanOrEqual(1);
      expect(resName.body.some((u) => u.name === 'John Doe')).toBe(true);
>>>>>>> main

      // Search by email
      const resEmail = await request(app).get('/api/users/search').query({ q: 'jane@example.com' });

      expect(resEmail.statusCode).toEqual(200);
<<<<<<< codex/analyze-codebase-for-project-overview
      expect(resEmail.body.data.length).toBeGreaterThanOrEqual(1);
      expect(resEmail.body.data.some((u) => u.name === 'Jane Smith')).toBe(true);
=======
      expect(resEmail.body.length).toBeGreaterThanOrEqual(1);
      expect(resEmail.body.some((u) => u.name === 'Jane Smith')).toBe(true);
>>>>>>> main
    });
  });

  describe('GET /api/v1/users', () => {
    it('should support versioned user routes', async () => {
      await User.create([
        { name: 'Versioned 1', email: 'v1@example.com', password: 'StrongP@ss1' }
      ]);

      const res = await request(app).get('/api/v1/users');

      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe('GET /api/users/:id', () => {
    it('should get a single user by ID', async () => {
      // Create a test user
      const user = await User.create(testUser);

      const res = await request(app).get(`/api/users/${user._id}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body._id).toBe(user._id.toString());
      expect(res.body.name).toBe(testUser.name);
    });

    it('should return 404 for non-existent user', async () => {
      const nonExistentId = '507f1f77bcf86cd799439011'; // Valid ObjectId but doesn't exist

      const res = await request(app).get(`/api/users/${nonExistentId}`);

      expect(res.statusCode).toEqual(404);
    });

    it('should return 400 for invalid ID format', async () => {
      const res = await request(app).get('/api/users/invalid-id');

      expect(res.statusCode).toEqual(400);
    });
  });

  describe('PATCH /api/users/:id', () => {
    it('should update a user', async () => {
      // Create a test user
      const user = await User.create(testUser);

      const updates = {
        name: 'Updated Name',
        email: 'updated@example.com'
      };

      const res = await request(app).patch(`/api/users/${user._id}`).send(updates);

      expect(res.statusCode).toEqual(200);
      expect(res.body.name).toBe(updates.name);
      expect(res.body.email).toBe(updates.email);
    });

    it('should validate update data', async () => {
      const user = await User.create(testUser);

      const res = await request(app)
        .patch(`/api/users/${user._id}`)
        .send({ email: 'invalid-email' });

      expect(res.statusCode).toEqual(400);
      expect(res.body.errors).toBeDefined();
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('should deactivate a user as admin', async () => {
      const adminToken = await createAdminToken();
      const user = await User.create(testUser);

<<<<<<< codex/analyze-codebase-for-project-overview
      const res = await request(app)
        .delete(`/api/users/${user._id}`)
        .set('Authorization', `Bearer ${adminToken}`);
=======
      const res = await request(app).delete(`/api/users/${user._id}`);
>>>>>>> main

      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toContain('deactivated');

      // Verify user is deactivated
      const deactivatedUser = await User.findOne({ _id: user._id, isActive: false });
      expect(deactivatedUser).not.toBeNull();
<<<<<<< codex/analyze-codebase-for-project-overview
    });

    it('should reject non-admin delete attempts', async () => {
      await request(app).post('/api/auth/register').send(testUser);
      const loginRes = await request(app)
        .post('/api/auth/login')
        .send({ email: testUser.email, password: testUser.password });

      const user = await User.findOne({ email: testUser.email });
      const res = await request(app)
        .delete(`/api/users/${user._id}`)
        .set('Authorization', `Bearer ${loginRes.body.data.accessToken}`);

      expect(res.statusCode).toEqual(403);
=======
>>>>>>> main
    });
  });

  describe('DELETE /api/users/:id/permanent', () => {
    it('should permanently delete a user as admin', async () => {
      const adminToken = await createAdminToken();
      const user = await User.create(testUser);

<<<<<<< codex/analyze-codebase-for-project-overview
      const res = await request(app)
        .delete(`/api/users/${user._id}/permanent`)
        .set('Authorization', `Bearer ${adminToken}`);
=======
      const res = await request(app).delete(`/api/users/${user._id}/permanent`);
>>>>>>> main

      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toContain('deleted');

      // Verify user is deleted
      const deletedUser = await User.findById(user._id);
      expect(deletedUser).toBeNull();
    });
  });
});
