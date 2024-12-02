import { initMock, closeMock } from "@utils/initMock";
import { afterEach, beforeEach, describe, it, expect } from "vitest";
import superagent from "supertest";
import { app } from "@infra/server";
import { User } from "@infra/database/models";

describe('List User Use Case', () => {
  beforeEach(async () => {
    await initMock();
  })

  afterEach(async () => {
    await closeMock();
  })

  describe('When execute is called', () => {
    it('should return a list of users', async () => {
      const luke = await User.findByPk(1);
      luke.roleId = 1;
      await luke.save();

      const authResponse = await superagent(app)
        .post("/auth/signin")
        .send({ email: "l.skywalker@jedi.org", password: "@SecurePassword123" });

      const { accessToken } = authResponse.body;

      const userResponse = await superagent(app)
        .get("/users")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(userResponse.status).toBe(200);
      expect(Array.isArray(userResponse.body)).toBe(true);
      expect(userResponse.body.length).toBe(1);
      expect(userResponse.body[0].name).toBe("Luke Skywalker");
    });

    it('should return permission error', async () => {
      const authResponse = await superagent(app)
        .post("/auth/signin")
        .send({ email: "l.skywalker@jedi.org", password: "@SecurePassword123" });
      console.log(authResponse.body);

      const { accessToken } = authResponse.body;

      const userResponse = await superagent(app)
        .get("/users")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(userResponse.status).toBe(403);
      expect(userResponse.body.message).toBe("User is not allowed to list users");
    });
  })
});