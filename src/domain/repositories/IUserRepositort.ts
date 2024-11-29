import { UserWithRole } from "@domain/types/UserWithRole";
import { User } from "@infra/database/models";
import { CreationAttributes, Transaction } from "sequelize";

export interface IUserRepository {
  findById(id: number, transaction?: Transaction): Promise<UserWithRole | null>;
  findByEmail(email: string, transaction?: Transaction): Promise<User | null>;
  create(user: CreationAttributes<User>, transaction?: Transaction): Promise<User>;
}