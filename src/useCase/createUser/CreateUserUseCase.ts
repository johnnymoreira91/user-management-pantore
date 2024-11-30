import { IUserRepository } from "@domain/repositories/IUserRepositort";
import { ICreateUserUseCase } from "@domain/useCase/createUserUseCase/ICreateUserUseCase";
import { User } from "@infra/database/models";
import { ICreateUserDTO } from "./CreateUserDTO";
import { ConflictError } from "@utils/errors/ConflictError";
import { IHashService } from "@domain/services/hashService/IHashService";
import { Transaction } from "sequelize";
import { WeakPasswordError } from "@utils/errors/WeakPasswordError";
import { IValidatePassword } from "@domain/services/validatePassword/IValidatePassword";

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashService: IHashService,
    private readonly validatePassword: IValidatePassword
  ) { }
  async execute(data: ICreateUserDTO, transaction?: Transaction): Promise<User> {
    const user = await this.userRepository.findByEmail(data.email);
    if (user) {
      throw new ConflictError('User already exists');
    }

    if (!this.validatePassword.validatePasswordStrength(data.password)) {
      throw new WeakPasswordError('Password must have at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character');
    }

    data.password = await this.hashService.encryptPassword(data.password);
    return this.userRepository.create(data, transaction);
  }
}