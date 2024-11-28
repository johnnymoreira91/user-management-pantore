import { Sequelize } from 'sequelize';

export type UmzugMigration = {
  context: Sequelize;
  path: string;
  name: string;
};

export type UmzugSeed = UmzugMigration;