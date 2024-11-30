import { UserRepository } from "@infra/repositories/UserRepository";
import { ReturnHandler } from "@infra/service/returnHandler/ReturnHandler";
import { TransactionManager } from "@infra/service/transactionManager/TransactionManager";
import { EditUserUseCase } from "./EditUserUseCase";
import { EditUserController } from "./EditUserController";
import { HashService } from "@infra/service/hashService/HashService";
import { ValidatePassword } from "@infra/service/validatePassword/ValidatePassword";

const transactionManager = new TransactionManager();
const returnHandler = new ReturnHandler();
const userRepository = new UserRepository();
const hashService = new HashService();
const validatePassword = new ValidatePassword();

const editUserUseCase = new EditUserUseCase(userRepository, hashService, validatePassword);
const editUserController = new EditUserController(editUserUseCase, returnHandler, transactionManager);

export { editUserController };