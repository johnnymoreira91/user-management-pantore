import { UserRepository } from "@infra/repositories/UserRepository";
import { ReturnHandler } from "@infra/service/returnHandler/ReturnHandler";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { CreateUserController } from "./CreateUserController";
import { HashService } from "@infra/service/hashService/HashService";

const userRepository = new UserRepository();
const returnHandler = new ReturnHandler();
const hashService = new HashService();
const createUserUseCase = new CreateUserUseCase(userRepository, hashService);
const createUserController = new CreateUserController(createUserUseCase, returnHandler);

export { createUserController };