import { IUserRepository } from "@domain/repositories/IUserRepositort";
import { ICreateUserUseCase } from "@domain/useCase/createUserUseCase/ICreateUserUseCase";
import { User } from "@infra/database/models";
import { ICreateUserDTO } from "./CreateUserDTO";
import { ConflictError } from "@utils/errors/ConflictError";
import { hash } from 'bcrypt';
import { IHashService } from "@domain/services/hashService/IHashService";

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashService: IHashService
  ) { }
  async execute(data: ICreateUserDTO): Promise<User> {
    const user = await this.userRepository.findByEmail(data.email);
    if (user) {
      throw new ConflictError('User already exists');
    }

    data.password = await this.hashService.encryptPassword(data.password);
    return this.userRepository.create(data);
  }
}