import { Transaction } from "sequelize";
import { IListUserRequestDTO } from "./IlistUserRequestDTO";
import { UserWithRole } from "@domain/types/UserWithRole";

export interface IListUserUseCase {
  execute(data: IListUserRequestDTO, userId: number, oleId: number, transaction?: Transaction): Promise<UserWithRole[] | null>;
}