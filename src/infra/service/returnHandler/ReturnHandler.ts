import { IReturnHandler } from "@domain/services/returnHandler/IReturnHandler";
import { ConflictError } from "@utils/errors/ConflictError";
import { Response } from "express";

export class ReturnHandler implements IReturnHandler {
  execute(error: Error, res: Response) {
    if (error instanceof ConflictError) {
      return res.status(409).json({ message: error.message });
    }

    return res.status(500).json({ message: error.message || 'Internal server error' });
  }
}
