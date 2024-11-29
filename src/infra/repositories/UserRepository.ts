import { IUserRepository } from "@domain/repositories/IUserRepositort";
import { UserWithRole } from "@domain/types/UserWithRole";
import { Role, User } from "@infra/database/models";
import { CreationAttributes, Transaction } from "sequelize";

export class UserRepository implements IUserRepository {
  async findById(id: number, transaction?: Transaction): Promise<UserWithRole | null> {
    return await User.findByPk(id, {
      include: {
        model: Role, as: "Role"
      }, 
      transaction
    });
  }
  async findByEmail(email: string, transaction?: Transaction): Promise<User | null> {
    return await User.findOne({ where: { email }, transaction });
  }
  async create(user: CreationAttributes<User>, transaction?: Transaction): Promise<User> {
    return await User.create(user, { transaction });
  }
}