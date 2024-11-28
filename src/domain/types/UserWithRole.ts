import { Role, User } from "@infra/database/models";

export type UserWithRole = User & {
  Role?: Role;
};
