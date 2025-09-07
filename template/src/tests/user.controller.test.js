import request from 'supertest';
import app from '../app.js';
import { connect, closeDatabase, clearDatabase } from './setup.js';
import User from '../models/user.model.js';

// Connect to the in-memory database before tests run
beforeAll(async () => {
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
    email: 'test@example.com'
  };

  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const res = await request(app)
        .post('/api/users')
        .send(testUser);
      
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body.name).toBe(testUser.name);
      expect(res.body.email).toBe(testUser.email);
    });

    it('should not create user with duplicate email', async () => {
      // First create a user
      await request(app).post('/api/users').send(testUser);
      
      // Try to create another user with same email
      const res = await request(app)
        .post('/api/users')
        .send(testUser);
      
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toContain('already in use');
    });

    it('should validate user input', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({ email: 'invalid-email' });
      
      expect(res.statusCode).toEqual(400);
      expect(res.body.errors).toBeDefined();
    });
  });

  describe('GET /api/users', () => {
    it('should get all users with pagination', async () => {
      // Create multiple test users
      await User.create([
        { name: 'User 1', email: 'user1@example.com' },
        { name: 'User 2', email: 'user2@example.com' },
        { name: 'User 3', email: 'user3@example.com' }
      ]);

      const res = await request(app)
        .get('/api/users')
        .query({ page: 1, limit: 2 });
      
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
        { name: 'John Doe', email: 'john@example.com' },
        { name: 'Jane Smith', email: 'jane@example.com' },
        { name: 'Bob Johnson', email: 'bob@example.com' }
      ]);

      // Search by name
      const resName = await request(app)
        .get('/api/users/search')
        .query({ q: 'John' });
      
      expect(resName.statusCode).toEqual(200);
      expect(resName.body.length).toBe(2); // John Doe and Bob Johnson

      // Search by email
      const resEmail = await request(app)
        .get('/api/users/search')
        .query({ q: 'jane@example.com' });
      
      expect(resEmail.statusCode).toEqual(200);
      expect(resEmail.body.length).toBe(1);
      expect(resEmail.body[0].name).toBe('Jane Smith');
    });
  });

  describe('GET /api/users/:id', () => {
    it('should get a single user by ID', async () => {
      // Create a test user
      const user = await User.create(testUser);
      
      const res = await request(app)
        .get(`/api/users/${user._id}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body._id).toBe(user._id.toString());
      expect(res.body.name).toBe(testUser.name);
    });

    it('should return 404 for non-existent user', async () => {
      const nonExistentId = '507f1f77bcf86cd799439011'; // Valid ObjectId but doesn't exist
      
      const res = await request(app)
        .get(`/api/users/${nonExistentId}`);
      
      expect(res.statusCode).toEqual(404);
    });

    it('should return 400 for invalid ID format', async () => {
      const res = await request(app)
        .get('/api/users/invalid-id');
      
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
      
      const res = await request(app)
        .patch(`/api/users/${user._id}`)
        .send(updates);
      
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
    it('should deactivate a user', async () => {
      const user = await User.create(testUser);
      
      const res = await request(app)
        .delete(`/api/users/${user._id}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toContain('deactivated');
      
      // Verify user is deactivated
      const deactivatedUser = await User.findById(user._id);
      expect(deactivatedUser.isActive).toBe(false);
    });
  });

  describe('DELETE /api/users/:id/permanent', () => {
    it('should permanently delete a user', async () => {
      const user = await User.create(testUser);
      
      const res = await request(app)
        .delete(`/api/users/${user._id}/permanent`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toContain('deleted');
      
      // Verify user is deleted
      const deletedUser = await User.findById(user._id);
      expect(deletedUser).toBeNull();
    });
  });
});
