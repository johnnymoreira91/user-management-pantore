import { UserWithRole } from "@domain/types/UserWithRole";
import { User } from "@infra/database/models";
import { CreationAttributes } from "sequelize";

export interface IUserRepository {
  findById(id: number): Promise<UserWithRole | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: CreationAttributes<User>): Promise<User>;
}