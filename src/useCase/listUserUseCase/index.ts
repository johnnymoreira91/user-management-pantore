import { UserRepository } from "@infra/repositories/UserRepository";
import { ReturnHandler } from "@infra/service/returnHandler/ReturnHandler";
import { TransactionManager } from "@infra/service/transactionManager/TransactionManager";
import { ListUserUseCase } from "./ListUserUseCase";
import { ListUserController } from "./ListUserController";

const returnHandler = new ReturnHandler()
const transactionManager = new TransactionManager()
const userRepository = new UserRepository()

const listUserUseCase = new ListUserUseCase(userRepository)
const listUserController = new ListUserController(listUserUseCase, returnHandler, transactionManager)

export { listUserController }