import { UserRepository } from "@infra/repositories/UserRepository";
import { SigninUseCase } from "./SigninUseCase";
import { HashService } from "@infra/service/hashService/HashService";
import { TokenService } from "@infra/service/tokenService/TokenService";
import { SigninController } from "./SigninController";
import { ReturnHandler } from "@infra/service/returnHandler/ReturnHandler";
import { TransactionManager } from "@infra/service/transactionManager/TransactionManager";

const userRepository = new UserRepository()
const hashService = new HashService()
const tokenService = new TokenService()
const returnHandler = new ReturnHandler()
const transactionManager = new TransactionManager()
const signinUseCase = new SigninUseCase(userRepository, hashService, tokenService)

const signinController = new SigninController(signinUseCase, returnHandler, transactionManager)

export {
  signinController
}