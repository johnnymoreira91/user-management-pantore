import { IReturnHandler } from "@domain/services/returnHandler/IReturnHandler";
import { ITransactionManager } from "@domain/services/transactionManager/ITransactionManager";
import { IEditUserController } from "@domain/useCase/editUserUseCase/IEditUserController";
import { IEditUserDTO } from "@domain/useCase/editUserUseCase/IEditUserDTO";
import { IEditUserUseCase } from "@domain/useCase/editUserUseCase/IEditUserUseCase";
import { Request, Response } from "express";

export class EditUserController implements IEditUserController {

  constructor(
    private readonly editUserUseCase: IEditUserUseCase,
    private readonly returnHandler: IReturnHandler,
    private readonly transactionManager: ITransactionManager
  ) {}

  async handle(req: Request<{ id: string; }, {}, IEditUserDTO>, res: Response): Promise<Response> {
    const { id } = req.params
    const { name, email, password, roleId } = req.body
    const t = await this.transactionManager.startTransaction()
    try {
      const filteredData: Partial<IEditUserDTO> = { name, email, password, roleId };
      const response = await this.editUserUseCase.execute(Number(id), filteredData)
      await this.transactionManager.commitTransaction(t)
      return res.status(200).json(response)
    } catch (error) {
      await this.transactionManager.rollbackTransaction(t)
      return await this.returnHandler.execute(error, res)
    }
  }
}