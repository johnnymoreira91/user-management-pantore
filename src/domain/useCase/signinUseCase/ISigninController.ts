import { Request, Response } from "express";
import { ISigninRequestDTO } from "./ISigninRequestDTO";

export interface ISigninController {
  handle(req: Request<{}, {}, ISigninRequestDTO>, res: Response): Promise<Response>;
}
