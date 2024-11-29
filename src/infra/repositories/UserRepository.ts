import { IUserRepository } from "@domain/repositories/IUserRepositort";
import { UserWithRole } from "@domain/types/UserWithRole";
import { Role, User } from "@infra/database/models";
import { CreationAttributes } from "sequelize";

export class UserRepository implements IUserRepository {
  async findById(id: number): Promise<UserWithRole | null> {
    return await User.findByPk(id, {
      include: {
        model: Role, as: "Role"
      }
    });
  }
  async findByEmail(email: string): Promise<User | null> {
    return await User.findOne({ where: { email } });
  }
  async create(user: CreationAttributes<User>): Promise<User> {
    return await User.create(user);
  }
}