import { IUserRepository } from "@domain/repositories/IUserRepositort";
import { UserWithRole } from "@domain/types/UserWithRole";
import { IListUserRequestDTO } from "@domain/useCase/listUserUseCase/IlistUserRequestDTO";
import { IListUserUseCase } from "@domain/useCase/listUserUseCase/IListUserUseCase";
import { User } from "@infra/database/models";
import Logger from "@infra/service/logger/winston";
import { Transaction } from "sequelize";

export class ListUserUseCase implements IListUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository
  ) {}

  async execute(data: IListUserRequestDTO, transaction?: Transaction): Promise<UserWithRole[] | null> {
    Logger.debug(data)
    const users = await this.userRepository.findAll(data, transaction);

    return users;
  }

}