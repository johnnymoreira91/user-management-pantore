import Logger from "@infra/service/logger/winston";
import Database from "../Database";
import { Role } from "./roles";
import { User } from "./user";

async function initModels() {
  const sequelize = Database.getSequelize()
  const models = [
    Role,
    User
  ];

  models.forEach((model) => {
    model.prototype.init(sequelize);
  });
  models.forEach((model) => {
    if (model.prototype.associate) {
      model.prototype.associate();
    }
  });
}

initModels().then(x => Logger.info('Starting models')).catch(err => Logger.error(err))

export {
  initModels,
  Role,
  User
}