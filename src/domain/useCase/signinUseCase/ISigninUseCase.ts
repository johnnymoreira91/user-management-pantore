import { ISigninRequestDTO } from "./ISigninRequestDTO";
import { ISigninReturn } from "./ISigninReturn";

export interface ISigninUseCase {
  execute(data: ISigninRequestDTO): Promise<ISigninReturn>
}