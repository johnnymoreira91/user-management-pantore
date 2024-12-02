import { IUserRepository } from "@domain/repositories/IUserRepositort";
import { UserWithRole } from "@domain/types/UserWithRole";
import { IListUserRequestDTO } from "@domain/useCase/listUserUseCase/IlistUserRequestDTO";
import { IListUserUseCase } from "@domain/useCase/listUserUseCase/IListUserUseCase";
import { User } from "@infra/database/models";
import Logger from "@infra/service/logger/winston";
import { ForbiddenError } from "@utils/errors/ForbiddenError";
import { Transaction } from "sequelize";

export class ListUserUseCase implements IListUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository
  ) {}

  async execute(data: IListUserRequestDTO, userId: number, roleId: number, transaction?: Transaction): Promise<UserWithRole[] | null> {
    if (roleId === 2) {
      Logger.info(`User ${userId} is not allowed to list users`);
      throw new ForbiddenError("User is not allowed to list users");
    }

    return await this.userRepository.findAll(data, transaction);
  }

}