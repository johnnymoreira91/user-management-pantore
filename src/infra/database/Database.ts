import { Sequelize } from "sequelize";
import { ENV } from "../config/params";

class Database {
  private static instance: Database;
  private readonly sequelize: Sequelize;

  private constructor () {
    console.log(`Process env is: ${ENV.NODE_ENV}`);
    if (ENV.NODE_ENV === "dev" || ENV.NODE_ENV === "prod") {
      this.sequelize = new Sequelize({
        username: ENV.DATABASE_USERNAME,
        password: ENV.DATABASE_PASSWORD,
        database: ENV.DATABASE_NAME,
        host: ENV.DATABASE_HOST,
        dialect: "postgres",
        minifyAliases: true,
        logging: false,
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false
          }
        }
      });
    } else if (ENV.NODE_ENV === "local") {
      this.sequelize = new Sequelize({
        username: ENV.DATABASE_USERNAME,
        password: ENV.DATABASE_PASSWORD,
        database: ENV.DATABASE_NAME,
        host: ENV.DATABASE_HOST,
        dialect: "postgres",
        minifyAliases: true,
        logging: false
      });
    } else if (ENV.NODE_ENV === "test") {
      this.sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
      });
    }
  }

  public static getInstance (): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }

  public getSequelize (): Sequelize {
    return this.sequelize;
  }
}

export default Database.getInstance();
