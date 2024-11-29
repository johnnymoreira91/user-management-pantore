import { ITransactionManager } from "@domain/services/transactionManager/ITransactionManager";
import Database from "@infra/database/Database";
import { Sequelize, Transaction } from "sequelize";

export class TransactionManager implements ITransactionManager {
  private sequelize: Sequelize;

  constructor() {
    this.sequelize = Database.getSequelize();
  }

  async startTransaction(): Promise<Transaction> {
    const transaction = await this.sequelize.transaction();
    console.log("Transaction started");
    return transaction;
  }

  async commitTransaction(transaction: Transaction): Promise<void> {
    await transaction.commit();
    console.log("Transaction committed");
  }

  async rollbackTransaction(transaction: Transaction): Promise<void> {
    await transaction.rollback();
    console.log("Transaction rolled back");
  }
}
