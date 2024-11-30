import { User } from "@infra/database/models";
import { CreationAttributes } from "sequelize";

export interface IEditUserUseCase {
  execute(id: number, data: Partial<CreationAttributes<User>>) : Promise<User>
}