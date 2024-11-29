import { IUserRepository } from "@domain/repositories/IUserRepositort";
import { IHashService } from "@domain/services/hashService/IHashService";
import { ITokenService } from "@domain/services/tokenService/ITokenService";
import { ISigninRequestDTO } from "@domain/useCase/signinUseCase/ISigninRequestDTO";
import { ISigninReturn } from "@domain/useCase/signinUseCase/ISigninReturn";
import { ISigninUseCase } from "@domain/useCase/signinUseCase/ISigninUseCase";
import { BadRequestError } from "@utils/errors/BadRequestError";
import { NotFoundError } from "@utils/errors/NotFoundError";

export class SigninUseCase implements ISigninUseCase {
  constructor(
    private userRepository: IUserRepository,
    private hashService: IHashService,
    private readonly tokenService: ITokenService
  ) {}
  async execute(data: ISigninRequestDTO): Promise<ISigninReturn> {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new NotFoundError('User not found / Wrong password');
    }

    const isPasswordValid = await this.hashService.isPasswordValid(data.password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestError('User not found / Wrong password');
    }

    const token = this.tokenService.generateToken({ 
      id: user.id,
      email: user.email,
      name: user.name,
      roleId: user.roleId
     });

     return {
      accessToken: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        roleId: user.roleId
      }
     }

  }
}