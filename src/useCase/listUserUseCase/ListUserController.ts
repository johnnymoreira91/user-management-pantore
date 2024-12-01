import { IReturnHandler } from "@domain/services/returnHandler/IReturnHandler";
import { ITransactionManager } from "@domain/services/transactionManager/ITransactionManager";
import { IListUserController } from "@domain/useCase/listUserUseCase/IListUserController";
import { IListUserRequestDTO } from "@domain/useCase/listUserUseCase/IlistUserRequestDTO";
import { IListUserUseCase } from "@domain/useCase/listUserUseCase/IListUserUseCase";
import { Request, Response } from "express";

export class ListUserController implements IListUserController {

  constructor(
    private readonly listUserUseCase: IListUserUseCase,
    private readonly returnHandler: IReturnHandler,
    private readonly transactionManager: ITransactionManager
  ) {}

  async handle(req: Request<{}, {}, {}, IListUserRequestDTO>, res: Response): Promise<Response> {
    const transaction = await this.transactionManager.startTransaction()
    const data = req.query
    try {
      const response = await this.listUserUseCase.execute({ ...data}, req.userId, req.roleId, transaction)
      await this.transactionManager.commitTransaction(transaction)
      return res.status(200).json(response)
    } catch (error) {
      await this.transactionManager.rollbackTransaction(transaction)
      return await this.returnHandler.execute(error, res)
    }
  }
}