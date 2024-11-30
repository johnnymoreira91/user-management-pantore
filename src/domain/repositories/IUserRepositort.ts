import { UserWithRole } from "@domain/types/UserWithRole";
import { User } from "@infra/database/models";
import { CreationAttributes, Transaction } from "sequelize";

export interface FindAllUsersParams {
  limit?: number;
  offset?: number;
  id?: number;
  name?: string;
  email?: string;
  roleId?: number;
}

export interface IUserRepository {
  findAll(filters: FindAllUsersParams, transaction?: Transaction): Promise<UserWithRole[]>
  findById(id: number, transaction?: Transaction): Promise<UserWithRole | null>;
  findByEmail(email: string, transaction?: Transaction): Promise<User | null>;
  create(user: CreationAttributes<User>, transaction?: Transaction): Promise<User>;
  update(user: User, changes: CreationAttributes<User> ,transaction?: Transaction): Promise<User>;
}