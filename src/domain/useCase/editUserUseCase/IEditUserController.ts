import { Request, Response } from "express";
import { IEditUserDTO } from "./IEditUserDTO";

export interface IEditUserController {
  handle(req: Request<{id: string}, {}, IEditUserDTO>, res: Response): Promise<Response>;
}
