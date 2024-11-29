import { initMock, closeMock } from "@utils/initMock";
import { afterEach, beforeEach, describe, it, expect } from "vitest";
import superagent from "supertest";
import { app } from "@infra/server";

describe('Signin use case', () => {
  beforeEach(async() => {
    await initMock();
  })

  afterEach(async() => {
    await closeMock();
  })

  describe('When signin is created', () => {
    it('should return 200 when user exists', async() => {
      const response = await superagent(app)
      .post('/auth/signin')
      .send({
        email: 'l.skywalker@jedi.org',
        password: '@SecurePassword123',
      })
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('accessToken');
      expect(response.body.user.email).toBe('l.skywalker@jedi.org')
    })
    it('should return 404 when user not found', async() => {
      const response = await superagent(app)
      .post('/auth/signin')
      .send({
        email: 'obiwan@jedi.org',
        password: '@SecurePassword123',
      })
      expect(response.status).toBe(404);
      expect(JSON.parse(response.text).message).toBe('User not found / Wrong password');
    })
    it('should return 400 when password is wrong', async() => {
      const response = await superagent(app)
      .post('/auth/signin')
      .send({
        email: 'l.skywalker@jedi.org',
        password: '@SecurePassword1234',
      })
      expect(response.status).toBe(400);
      expect(JSON.parse(response.text).message).toBe('User not found / Wrong password');
    })
  })
});