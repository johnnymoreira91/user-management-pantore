import { Response } from "express";

export interface IReturnHandler {
  execute(error: Error, res: Response);
}