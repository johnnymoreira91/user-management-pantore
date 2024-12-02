import { initMock, closeMock } from "@utils/initMock";
import { afterEach, beforeEach, describe, it, expect, vi } from "vitest";
import superagent from "supertest";
import { app } from "@infra/server";
import { UserRepository } from "@infra/repositories/UserRepository";
import { User } from "@infra/database/models";

describe('Profile User Use Case', () => {
  beforeEach(async () => {
    await initMock();
  })

  afterEach(async () => {
    await closeMock();
  })

  describe('When execute is called', () => {
    it('should get user profile with success', async () => {
      const authResponse = await superagent(app)
        .post("/auth/signin")
        .send({ email: "l.skywalker@jedi.org", password: "@SecurePassword123" });

      const { accessToken } = authResponse.body;

      const userResponse = await superagent(app)
        .get("/users/profile")
        .set("Authorization", `Bearer ${accessToken}`)

      expect(userResponse.status).toBe(200);
      expect(Array.isArray(userResponse.body)).toBe(false);
      expect(userResponse.body.name).toBe("Luke Skywalker");
    });

    it('should get error on database', async () => {
      vi.spyOn(User, 'findByPk').mockRejectedValueOnce(new Error('Database error'));
      const authResponse = await superagent(app)
        .post("/auth/signin")
        .send({ email: "l.skywalker@jedi.org", password: "@SecurePassword123" });

      const { accessToken } = authResponse.body;

      const userResponse = await superagent(app)
        .get("/users/profile")
        .set("Authorization", `Bearer ${accessToken}`)

      console.log(userResponse)

      expect(userResponse.status).toBe(500);
      expect(userResponse.body.message).toBe('Database error');
    });
  })
});