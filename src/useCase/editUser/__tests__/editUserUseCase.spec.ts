import { initMock, closeMock } from "@utils/initMock";
import { afterEach, beforeEach, describe, it, expect } from "vitest";
import superagent from "supertest";
import { app } from "@infra/server";
import { User } from "@infra/database/models";

describe('Edit User Use Case', () => {
  beforeEach(async () => {
    await initMock();
  })

  afterEach(async () => {
    await closeMock();
  })

  describe('When execute is called', () => {
    it('should edit user name with success', async () => {
      const original = await User.findByPk(1);

      const authResponse = await superagent(app)
        .post("/auth/signin")
        .send({ email: "l.skywalker@jedi.org", password: "@SecurePassword123" });

      const { accessToken } = authResponse.body;

      const userResponse = await superagent(app)
        .patch("/users/1")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({ name: "Anakin Skywalker Jr" });

      expect(userResponse.status).toBe(200);
      expect(Array.isArray(userResponse.body)).toBe(false);
      expect(userResponse.body.name).toBe("Anakin Skywalker Jr");
    });

    it('should edit user password with success', async () => {
      const original = await User.findByPk(1);

      const authResponse = await superagent(app)
        .post("/auth/signin")
        .send({ email: "l.skywalker@jedi.org", password: "@SecurePassword123" });

      const { accessToken } = authResponse.body;

      const userResponse = await superagent(app)
        .patch("/users/1")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({ password: "@SecureInicialPassword123" });

      expect(userResponse.status).toBe(200);
      expect(Array.isArray(userResponse.body)).toBe(false);
      expect(userResponse.body.name).toBe("Luke Skywalker");
    });

    it('should edit user not found', async () => {
      const original = await User.findByPk(1);

      const authResponse = await superagent(app)
        .post("/auth/signin")
        .send({ email: "l.skywalker@jedi.org", password: "@SecurePassword123" });

      const { accessToken } = authResponse.body;

      const userResponse = await superagent(app)
        .patch("/users/10")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({ password: "@SecureInicialPassword123" });

      expect(userResponse.status).toBe(404);
      expect(userResponse.body.message).toBe("User not found");
    });
  })
});