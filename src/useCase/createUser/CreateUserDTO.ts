import { User } from "@infra/database/models";
import { CreationAttributes } from "sequelize";

export interface ICreateUserDTO extends CreationAttributes<User> {}