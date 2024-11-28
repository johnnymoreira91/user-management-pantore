import { Umzug, SequelizeStorage } from "umzug";
import database from "./Database";

export const migrator = new Umzug({
  migrations: {
    glob: ["migrations/*.ts", { cwd: __dirname }]
  },
  context: database.getSequelize(),
  storage: new SequelizeStorage({
    sequelize: database.getSequelize(),
    modelName: "migration_meta"
  }),
  logger: console
});

export const seeder = new Umzug({
  migrations: {
    glob: ["seeds/*.ts", { cwd: __dirname }]
  },
  context: database.getSequelize(),
  storage: new SequelizeStorage({
    sequelize: database.getSequelize(),
    modelName: "seeder_meta"
  }),
  logger: console
});

export type Migration = typeof migrator._types.migration;
export type Seeder = typeof seeder._types.migration;
