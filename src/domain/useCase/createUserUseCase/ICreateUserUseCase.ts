import { User } from "@infra/database/models";
import { ICreateUserDTO } from "@useCase/createUser/CreateUserDTO";
import { Transaction } from "sequelize";

export interface ICreateUserUseCase {
  execute(data: ICreateUserDTO, transaction?: Transaction): Promise<User>
}