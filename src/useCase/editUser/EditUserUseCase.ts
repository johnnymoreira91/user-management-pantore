import { IUserRepository } from "@domain/repositories/IUserRepositort";
import { IHashService } from "@domain/services/hashService/IHashService";
import { IValidatePassword } from "@domain/services/validatePassword/IValidatePassword";
import { IEditUserUseCase } from "@domain/useCase/editUserUseCase/IEditUserUseCase";
import { User } from "@infra/database/models";
import { NotFoundError } from "@utils/errors/NotFoundError";
import { CreationAttributes } from "sequelize";

export class EditUserUseCase implements IEditUserUseCase {

  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashService: IHashService,
    private readonly validatePassword: IValidatePassword
  ) {}

  async execute(id: number, data: Partial<CreationAttributes<User>>): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundError('User not found');

    if (data.password) {
      data.password = await this.hashService.encryptPassword(data.password);
    }
  
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== null && value !== undefined)
    );
  
    return await this.userRepository.update(user, filteredData as CreationAttributes<User>);
  }
}