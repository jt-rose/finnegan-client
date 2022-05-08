import { useQuery } from "react-query";
import { BASE_ROUTE } from "../queries/baseRoute";
import { get, post, put, remove } from "../queries/fetchers";
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
  public static URL = BASE_ROUTE + "/transactions";

  save() {
    return post(Transaction.URL, {
      amount: this.amount,
      catgeory: this.category,
      date: this.date,
      note: this.note,
    });
  }

  public static get useFetch() {
    return () =>
      useQuery<ITransaction[], Error>("transactions", () =>
        get(Transaction.URL)
      );
  }

  public static edit(transaction: ITransaction) {
    return put(Transaction.URL + "/" + transaction.id, transaction);
  }

  public static remove(transaction: ITransaction) {
    return remove(Transaction.URL + "/" + transaction.id);
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
