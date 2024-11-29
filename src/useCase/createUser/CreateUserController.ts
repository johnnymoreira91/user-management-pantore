import { ICreateUserController } from "@domain/useCase/createUserUseCase/ICreateUserController";
import { Request, Response } from "express";
import { ICreateUserDTO } from "./CreateUserDTO";
import { ICreateUserUseCase } from "@domain/useCase/createUserUseCase/ICreateUserUseCase";
import { IReturnHandler } from "@domain/services/returnHandler/IReturnHandler";

export class CreateUserController implements ICreateUserController {
  constructor(
    private readonly createUserUseCase: ICreateUserUseCase,
    private readonly returnHandle: IReturnHandler
  ) { }
  async handle(req: Request<{}, {}, ICreateUserDTO>, res: Response): Promise<Response> {
    const { name, email, password, roleId } = req.body;
    try {
      const response = await this.createUserUseCase.execute({ name, email, password, roleId });
      return res.status(201).json(response);
    } catch (error) {
      return this.returnHandle.execute(error, res);
    }
  }
}