import { FindAllUsersParams, IUserRepository } from "@domain/repositories/IUserRepositort";
import { UserWithRole } from "@domain/types/UserWithRole";
import { Role, User } from "@infra/database/models";
import { CreationAttributes, Op, Transaction, WhereOptions } from "sequelize";

export class UserRepository implements IUserRepository {
  async update(user: User, changes: CreationAttributes<User>, transaction?: Transaction): Promise<User> {
    Object.assign(user, changes);
    return await user.save({ transaction });
  }

  async findAll(
    filters: FindAllUsersParams,
    transaction?: Transaction
  ): Promise<UserWithRole[]> {
    const { limit = 10, offset = 0, id, name, email, roleId } = filters;

    const where: WhereOptions = {};
    if (id) where.id = id;
    if (name) where.name = { [Op.like]: `%${name}%` };
    if (email) where.email = { [Op.like]: `%${email}%` };
    if (roleId) where.roleId = roleId;

    return await User.findAll({
      where,
      include: {
        model: Role,
        as: "Role",
      },
      limit,
      offset,
      transaction,
    });
  }
  
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