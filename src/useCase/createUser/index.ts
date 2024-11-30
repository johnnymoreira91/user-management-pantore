import { UserRepository } from "@infra/repositories/UserRepository";
import { ReturnHandler } from "@infra/service/returnHandler/ReturnHandler";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { CreateUserController } from "./CreateUserController";
import { HashService } from "@infra/service/hashService/HashService";
import { TransactionManager } from "@infra/service/transactionManager/TransactionManager";
import { ValidatePassword } from "@infra/service/validatePassword/ValidatePassword";

const userRepository = new UserRepository();
const returnHandler = new ReturnHandler();
const hashService = new HashService();
const transactionManager = new TransactionManager();
const validatePassword = new ValidatePassword();
const createUserUseCase = new CreateUserUseCase(userRepository, hashService, validatePassword);
const createUserController = new CreateUserController(createUserUseCase, returnHandler, transactionManager);

export { createUserController };