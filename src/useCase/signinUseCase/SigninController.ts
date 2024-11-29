import { ISigninController } from "@domain/useCase/signinUseCase/ISigninController";
import { ISigninRequestDTO } from "@domain/useCase/signinUseCase/ISigninRequestDTO";
import { Request, Response } from "express";

export class SigninController implements ISigninController {
  handle(req: Request<{}, {}, ISigninRequestDTO>, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }
}