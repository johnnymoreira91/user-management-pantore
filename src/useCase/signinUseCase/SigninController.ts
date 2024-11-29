import { IReturnHandler } from "@domain/services/returnHandler/IReturnHandler";
import { ITransactionManager } from "@domain/services/transactionManager/ITransactionManager";
import { ISigninController } from "@domain/useCase/signinUseCase/ISigninController";
import { ISigninRequestDTO } from "@domain/useCase/signinUseCase/ISigninRequestDTO";
import { ISigninUseCase } from "@domain/useCase/signinUseCase/ISigninUseCase";
import e, { Request, Response } from "express";

export class SigninController implements ISigninController {

  constructor(
    private readonly signinUseCase: ISigninUseCase,
    private readonly returnHandler: IReturnHandler,
    private readonly transactionManager: ITransactionManager
  ) {}

  async handle(req: Request<{}, {}, ISigninRequestDTO>, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const transaction = await this.transactionManager.startTransaction();
    try {
      const result = await this.signinUseCase.execute({ email, password }, transaction);
      await this.transactionManager.commitTransaction(transaction);
      return res.status(200).json(result);
    } catch (error) {
      await this.transactionManager.rollbackTransaction(transaction);
      return this.returnHandler.execute(error, res);
    }
  }
}