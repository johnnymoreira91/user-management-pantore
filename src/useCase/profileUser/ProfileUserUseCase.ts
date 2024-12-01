import { IUserRepository } from "@domain/repositories/IUserRepositort";
import { UserWithRole } from "@domain/types/UserWithRole";
import { IProfileUseCase } from "@domain/useCase/profileUseCase/IProfileUseCase";
import { IProfileUserDTO } from "@domain/useCase/profileUseCase/IProfileUseDTO";
import { NotFoundError } from "@utils/errors/NotFoundError";
import { Transaction } from "sequelize";

export class ProfileUserUseCase implements IProfileUseCase {
  constructor(
    private readonly userRepository: IUserRepository
  ) {}

  async execute(data: IProfileUserDTO, transaction?: Transaction): Promise<UserWithRole> {
    const user = await this.userRepository.findById(data.userId, transaction);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }
}