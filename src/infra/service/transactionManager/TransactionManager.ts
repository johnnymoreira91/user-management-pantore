import { ITransactionManager } from "@domain/services/transactionManager/ITransactionManager";
import Database from "@infra/database/Database";
import { Sequelize, Transaction } from "sequelize";
import Logger from "../logger/winston";

export class TransactionManager implements ITransactionManager {
  private sequelize: Sequelize;

  constructor() {
    this.sequelize = Database.getSequelize();
  }

  async startTransaction(): Promise<Transaction> {
    const transaction = await this.sequelize.transaction();
    Logger.debug("Transaction started");
    return transaction;
  }

  async commitTransaction(transaction: Transaction): Promise<void> {
    await transaction.commit();
    Logger.debug("Transaction committed");
  }

  async rollbackTransaction(transaction: Transaction): Promise<void> {
    await transaction.rollback();
    Logger.debug("Transaction rolled back");
  }
}
