import { Request, Response } from "express";

import { IProfileUseCase } from "@domain/useCase/profileUseCase/IProfileUseCase";
import { IProfileUserController } from "@domain/useCase/profileUseCase/IProfileController";
import { IReturnHandler } from "@domain/services/returnHandler/IReturnHandler";
import { ITransactionManager } from "@domain/services/transactionManager/ITransactionManager";

export class ProfileUserController implements IProfileUserController {
  constructor(private profileUseCase: IProfileUseCase,
    private readonly returnHandler: IReturnHandler,
    private readonly transactionManager: ITransactionManager
  ) {}

  async handle(req: Request<{}, {}, {}, {}>, res: Response): Promise<Response> {
    const userId = req.userId
    const t = await this.transactionManager.startTransaction();
    try {
      const user = await this.profileUseCase.execute({
        userId
      }, t);

      await this.transactionManager.commitTransaction(t);
      return res.status(200).json(user);
    } catch (error) {
      await this.transactionManager.rollbackTransaction(t);
      return await this.returnHandler.execute(error, res);
    }
  }
}