import { ICreateUserController } from "@domain/useCase/createUserUseCase/ICreateUserController";
import { Request, Response } from "express";
import { ICreateUserDTO } from "./CreateUserDTO";
import { ICreateUserUseCase } from "@domain/useCase/createUserUseCase/ICreateUserUseCase";
import { IReturnHandler } from "@domain/services/returnHandler/IReturnHandler";
import { ITransactionManager } from "@domain/services/transactionManager/ITransactionManager";
import Logger from "@infra/service/logger/winston";

export class CreateUserController implements ICreateUserController {
  constructor(
    private readonly createUserUseCase: ICreateUserUseCase,
    private readonly returnHandle: IReturnHandler,
    private readonly transactionManager: ITransactionManager
  ) { }
  async handle(req: Request<{}, {}, ICreateUserDTO>, res: Response): Promise<Response> {
    const { name, email, password, roleId } = req.body;
    const t = await this.transactionManager.startTransaction();
    try {
      const response = await this.createUserUseCase.execute({ name, email, password, roleId }, t);
      await this.transactionManager.commitTransaction(t);
      return res.status(201).json(response);
    } catch (error) {
      await this.transactionManager.rollbackTransaction(t);
      return this.returnHandle.execute(error, res);
    }
  }
}