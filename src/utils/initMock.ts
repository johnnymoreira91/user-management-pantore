import { 
  initModels,
  Role,
  User,
 } from "@infra/database/models"
import Database from "../infra/database/Database"
import Logger from "@infra/service/logger/winston"
import { roleMock } from "./mock/roleMock"
import { userMock } from "./mock/userMock"

async function initMock() {
  process.env.NODE_ENV = 'test'
  const db = Database.getSequelize()
  try {
    await db.drop()
    await db.sync()
    await initModels()

    await Role.sync({ force: true })
    await User.sync({ force: true })

    await Role.bulkCreate(roleMock)
    await User.bulkCreate(userMock)

  } catch (error) {
    await db.drop()
    Logger.error(error)
  }
}

async function closeMock() {
  process.env.NODE_ENV = 'test'
  const db = Database.getSequelize()
  try {
    console.log('closing DB')
    await db.drop()
  } catch (error) {
    console.log(error)
  }
}

export {
  initMock,
  closeMock
}