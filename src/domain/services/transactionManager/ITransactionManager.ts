import { Transaction } from "sequelize";

export interface ITransactionManager {
  startTransaction(): Promise<Transaction>;
  commitTransaction(transaction: Transaction): Promise<void>;
  rollbackTransaction(transaction: Transaction): Promise<void>;
}