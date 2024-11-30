import { User } from "@infra/database/models";
import { CreationAttributes } from "sequelize";

export interface IEditUserDTO extends CreationAttributes<User> {}