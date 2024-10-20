import request from 'supertest';
import { server } from '../index';
import { v4 as uuidv4 } from 'uuid';
import {
  testUsers,
  testUserCreate,
  testUserUpdate,
} from '../constants/test-users';
import { RESPONSE_MESSAGES } from '../constants/response-messages';
import { User } from '../types/server';

const testServer = request(server);

let testUserId = '';

describe('test for simple crud API', () => {
  // restart server before tests
  beforeAll(() => {
    const serverPort = process.env.APP_PORT || 9090;
    server.close();
    server.listen(serverPort);
  });

  // stop server after test execution
  // reset testId
  afterAll(() => {
    server.close();
    testUserId = '';
  });

  describe('GET api/users', () => {
    it('should return empty [] for the first call', async () => {
      const res = await testServer.get('/api/users');
      expect(res.status).toBe(200);
      expect(res.body).toEqual(testUsers);
    });
  });

  describe('POST api/users', () => {
    it('should create user with a valid request', async () => {
      const res = await testServer.post('/api/users').send(testUserCreate);
      expect(res.status).toBe(201);
      const { id, ...bodyWithoutId } = res.body;
      testUserId = id;
      expect(bodyWithoutId).toEqual(testUserCreate);
    });

    it("should return error with status 400 if body doesn't contains required fields", async () => {
      const { age, ...restParams } = testUserCreate;
      const res = await testServer.post('/api/users').send(restParams);
      expect(res.status).toBe(400);
      expect(res.body.message).toBe(RESPONSE_MESSAGES.fieldRequired);
    });
  });

  describe('GET /api/users/:userId', () => {
    it('should return a user if valid userId is passed', async () => {
      const res = await testServer.get(`/api/users/${testUserId}`);
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ id: testUserId, ...testUserCreate });
    });

    it('should return status 400 if userId is invalid', async () => {
      const res = await testServer.get('/api/users/345-invalid-id');
      expect(res.status).toBe(400);
      expect(res.body.message).toBe(RESPONSE_MESSAGES.invalidId);
    });

    it('should return 404 if user is not found', async () => {
      const testId = uuidv4();
      await testServer.post('/api/users').send(testUserCreate);

      const res = await testServer.get(`/api/users/${testId}`);
      expect(res.status).toBe(404);
      expect(res.body.message).toBe(RESPONSE_MESSAGES.userNotFound);
    });
  });

  describe('PUT api/users', () => {
    it('should update an existing user', async () => {
      const res = await testServer
        .put(`/api/users/${testUserId}`)
        .send(testUserUpdate);
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ id: testUserId, ...testUserUpdate });
    });

    it('should return 400 if userId is invalid', async () => {
      const res = await testServer.put('/api/users/345-invalid-id').send({});
      expect(res.status).toBe(400);
      expect(res.body.message).toBe(RESPONSE_MESSAGES.invalidId);
    });

    it('should return 404 if user is not found', async () => {
      const testId = uuidv4();
      const res = await testServer.put(`/api/users/${testId}`).send({});
      expect(res.status).toBe(404);
      expect(res.body.message).toBe(RESPONSE_MESSAGES.userNotFound);
    });
  });

  describe('DELETE /api/users/:userId', () => {
    it('should delete an existing user', async () => {
      server.close();
      server.listen(process.env.APP_PORT || 9090);

      const res = await testServer.delete(`/api/users/${testUserId}`);
      expect(res.status).toBe(204);
      const { body } = await testServer.get('/api/users');
      const users: User[] = body;
      // rely on post user during test processing only once inside testing post method
      expect(users).toHaveLength(1);
      expect(users.find((item) => item.id === testUserId)).toBeUndefined();
    });

    it('should return 400 if userId is invalid', async () => {
      const res = await testServer.delete('/api/users/345-invalid-id');
      expect(res.status).toBe(400);
      expect(res.body.message).toBe(RESPONSE_MESSAGES.invalidId);
    });

    it('should return 404 if user is not found', async () => {
      const testId = uuidv4();
      const res = await testServer.delete(`/api/users/${testId}`);
      expect(res.status).toBe(404);
      expect(res.body.message).toBe(RESPONSE_MESSAGES.userNotFound);
    });

    it('should return 404 if try delete same user twice', async () => {
      const {
        body: { id, ...rest },
      } = await testServer.post('/api/users').send(testUserCreate);
      testUserId = id;

      const res = await testServer.delete(`/api/users/${testUserId}`);
      expect(res.status).toBe(204);
      const resAgain = await testServer.delete(`/api/users/${testUserId}`);
      expect(resAgain.status).toBe(404);
      expect(resAgain.body.message).toBe(RESPONSE_MESSAGES.userNotFound);
    });
  });

  describe('should not handle not valid paths', () => {
    it('should return 500', async () => {
      const res = await testServer.get('/api/no-valid-url');
      expect(res.status).toBe(404);
      expect(res.body.message).toBe(RESPONSE_MESSAGES.urlNotFound);
    });
  });
});
