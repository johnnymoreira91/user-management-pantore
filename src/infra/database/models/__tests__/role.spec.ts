import { afterEach, beforeEach, it, describe, expect } from 'vitest';
import { initMock, closeMock } from "../../../../utils/initMock";
import { Role } from "../roles";
import { User } from '../user';

describe('Role Model', () => {
  beforeEach(async () => {
    await initMock()
  })

  afterEach(async () => {
    await closeMock()
  })

  describe('When findAll is called', () => {
    it('should return all roles', async () => {
      const roles = await Role.findAll()

      expect(roles).toHaveLength(2)
      expect(roles[0].id).toBe(1)
      expect(roles[0].name).toBe('admin')
      expect(roles[1].id).toBe(2)
      expect(roles[1].name).toBe('client')
    })
    it('should return all roles with users', async () => {
      const roles = await Role.findAll({ include: {
        model: User, as: 'Users'
      } })

      expect(roles).toHaveLength(2)
      expect(roles[1].Users[0].name).toBe('Luke Skywalker')
    })
  })
})