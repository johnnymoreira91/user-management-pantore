import { Request, Response } from "express";

export interface IProfileUserController {
  handle(req: Request<{}, {}, {}, {}>, res: Response): Promise<Response>;
}