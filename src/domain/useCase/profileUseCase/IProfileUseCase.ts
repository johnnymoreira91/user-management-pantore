import { UserWithRole } from "@domain/types/UserWithRole";
import { IProfileUserDTO } from "./IProfileUseDTO";
import { Transaction } from "sequelize";

export interface IProfileUseCase {
  execute(data: IProfileUserDTO, transaction?: Transaction): Promise<UserWithRole>
}