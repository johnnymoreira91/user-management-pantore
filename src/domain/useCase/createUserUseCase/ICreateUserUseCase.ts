import { User } from "@infra/database/models";
import { ICreateUserDTO } from "@useCase/createUser/CreateUserDTO";

export interface ICreateUserUseCase {
  execute(data: ICreateUserDTO): Promise<User>
}