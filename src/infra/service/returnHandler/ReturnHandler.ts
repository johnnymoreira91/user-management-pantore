import { IReturnHandler } from "@domain/services/returnHandler/IReturnHandler";
import { BadRequestError } from "@utils/errors/BadRequestError";
import { ConflictError } from "@utils/errors/ConflictError";
import { NotFoundError } from "@utils/errors/NotFoundError";
import { WeakPasswordError } from "@utils/errors/WeakPasswordError";
import { Response } from "express";

export class ReturnHandler implements IReturnHandler {
  execute(error: Error, res: Response) {
    if (error instanceof ConflictError) {
      return res.status(409).json({ message: error.message });
    }
    if (error instanceof NotFoundError) {
      return res.status(404).json({ message: error.message });
    }
    if (error instanceof BadRequestError) {
      return res.status(400).json({ message: error.message });
    }
    if (error instanceof WeakPasswordError) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: error.message || 'Internal server error' });
  }
}
