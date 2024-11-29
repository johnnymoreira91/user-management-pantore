import { Transaction } from "sequelize";
import { IListUserRequestDTO } from "./IlistUserRequestDTO";
import { UserWithRole } from "@domain/types/UserWithRole";

export interface IListUserUseCase {
  execute(data: IListUserRequestDTO, transaction?: Transaction): Promise<UserWithRole[] | null>;
}