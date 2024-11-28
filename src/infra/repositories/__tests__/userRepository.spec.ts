import { IUserRepository } from '@domain/repositories/IUserRepositort';
import { closeMock, initMock } from '@utils/initMock';
import { afterEach, beforeEach, it, describe, expect } from 'vitest';
import { UserRepository } from '../UserRepository';
import { CreationAttributes } from 'sequelize';
import { User } from '@infra/database/models';

describe('User Repository', () => {
  let userRepository: IUserRepository
  beforeEach(async () => {
    await initMock()
    userRepository = new UserRepository()
  })

  afterEach(async () => {
    await closeMock()
  })

  describe('When findById is called', () => {
    it('should return one user', async () => {
      const user = await userRepository.findById(1)
      expect(user.name).toBe('Luke Skywalker')
      expect(user.Role?.name).toBe('client')
    })

    it('should return null when user does not exist', async () => {
      const user = await userRepository.findById(2)
      expect(user).toBeNull()
    })
  })

  describe('When findByEmail is called', () => {
    it('Should return one user', async () => {
      const user = await userRepository.findByEmail('l.skywalker@jedi.org')
      expect(user.name).toBe('Luke Skywalker')
    })
  })

  describe('When create is called', () => {
    it('Should create a new user', async () => {
      const payload: CreationAttributes<User> = {
        email: 'c3p0@droid-protocol.com',
        name: 'C-3PO',
        password: '@ProtocolSecure123',
        roleId: 1
      }

      const user = await userRepository.create(payload)
      expect(user.name).toBe('C-3PO')
    })
  })
})