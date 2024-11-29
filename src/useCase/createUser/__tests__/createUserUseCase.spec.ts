import { initMock, closeMock } from "@utils/initMock";
import { afterEach, beforeEach, describe, it, expect } from "vitest";
import superagent from "supertest";
import { app } from "@infra/server";

describe('Create user use case', () => {
  beforeEach(async() => {
    await initMock();
  })

  afterEach(async() => {
    await closeMock();
  })

  describe('When user is created', () => {
    it('should return the user created', async() => {
      const response = await superagent(app)
      .post('/users')
      .send({
        name: 'Leia',
        email: 'leia.organa@senate.com',
        password: '123456',
        roleId: 1
      })
      expect(response.status).toBe(201);
    })
    it('Should return 409 when user already exists', async() => {
      const response = await superagent(app)
      .post('/users')
      .send({
        id: 1,
        name: 'Luke Skywalker',
        email: 'l.skywalker@jedi.org',
        password: '@SecurePassword123',
        roleId: 2
      })
      expect(response.status).toBe(409);
    });
  })
});