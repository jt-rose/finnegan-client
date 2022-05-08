import { post, put, remove } from "../queries/fetchers";
import { TRANSACTION_ROUTE } from "../queries/routes";
import { User } from "./User";

// The Transaction class is used to construct a Transaction entity
// and the ITransaction interface references a Transaction
// that has been stored in the database and been assigned
// a transaction id and associated owner
export class Transaction {
  amount: number;
  category: string;
  date: Date;
  note?: string;

  save() {
    return post(TRANSACTION_ROUTE, {
      amount: this.amount,
      catgeory: this.category,
      date: this.date,
      note: this.note,
    });
  }

  public static edit(transaction: ITransaction) {
    return put(TRANSACTION_ROUTE + "/" + transaction.id, transaction);
  }

  public static remove(transaction: ITransaction) {
    return remove(TRANSACTION_ROUTE + "/" + transaction.id);
  }

  constructor(amount: number, category: string, note?: string) {
    this.amount = amount;
    this.category = category;
    this.date = new Date();
    this.note = note;
  }
}
export interface ITransaction extends Omit<Transaction, "save"> {
  readonly id: number;
  owner: User;
}
