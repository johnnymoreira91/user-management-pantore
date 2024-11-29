import { ICreateUserDTO } from "@useCase/createUser/CreateUserDTO";
import { Request, Response } from "express";

export interface ICreateUserController {
  handle(req: Request<{}, {}, ICreateUserDTO>, res: Response): Promise<Response>;
}
