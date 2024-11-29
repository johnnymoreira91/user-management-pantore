import { Transaction } from "sequelize";
import { ISigninRequestDTO } from "./ISigninRequestDTO";
import { ISigninReturn } from "./ISigninReturn";

export interface ISigninUseCase {
  execute(data: ISigninRequestDTO, transaction?: Transaction): Promise<ISigninReturn>
}