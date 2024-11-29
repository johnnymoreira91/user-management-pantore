import { Request, Response } from "express";
import { IListUserRequestDTO } from "./IlistUserRequestDTO";

export interface IListUserController {
  handle(req: Request<{}, IListUserRequestDTO, {}>, res: Response): Promise<Response>;
}