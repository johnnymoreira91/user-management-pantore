import { UserRepository } from "@infra/repositories/UserRepository";
import { ProfileUserUseCase } from "./ProfileUserUseCase";
import { ReturnHandler } from "@infra/service/returnHandler/ReturnHandler";
import { TransactionManager } from "@infra/service/transactionManager/TransactionManager";
import { ProfileUserController } from "./ProfileUserController";

const userRepository = new UserRepository();
const returnHandler = new ReturnHandler();
const transactionManager = new TransactionManager();
const profileUseCase = new ProfileUserUseCase(userRepository);
const profileUserController = new ProfileUserController(profileUseCase, returnHandler, transactionManager);

export { profileUserController };