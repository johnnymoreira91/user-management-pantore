import dotenv from "dotenv";
dotenv.config();
import { Sequelize } from "sequelize";
import { Umzug, SequelizeStorage } from "umzug";

let sequelize: Sequelize | null
if (process.env.NODE_ENV === 'local') {
  sequelize = new Sequelize({
    dialect: "postgres",
    host: process.env.DATABASE_HOST || "localhost",
    username: process.env.DATABASE_USERNAME || "postgres",
    password: process.env.DATABASE_PASSWORD || "postgres",
    database: process.env.DATABASE_NAME || "postgres",
    port: 5432,
    minifyAliases: true
  });
} else {
  sequelize = new Sequelize({
    dialect: "postgres",
    host: process.env.DATABASE_HOST || "localhost",
    username: process.env.DATABASE_USERNAME || "postgres",
    password: process.env.DATABASE_PASSWORD || "postgres",
    database: process.env.DATABASE_NAME || "postgres",
    port: 5432,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, 
      },
    },
    minifyAliases: true
  });
}

const umzug = new Umzug({
  migrations: {
    glob: "src/infra/database/migrations/*.migration.ts"
  },
  context: sequelize,
  storage: new SequelizeStorage({
    sequelize,
    modelName: "sequelize_meta"
  }),
  logger: console
});

const task = process.env.MIGRATION;

switch (task) {
  case "up":
    umzug.up().then((result) => {
      console.log("Migrations up went successful!", result);
      process.exit(0);
    });
    break;
  case "down":
    umzug.down().then((result) => {
      console.log("Migrations down went successful!", result);
      process.exit(0);
    });
    break;
  default:
    break;
}
