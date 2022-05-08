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

  constructor(amount: number, category: string, note?: string) {
    this.amount = amount;
    this.category = category;
    this.date = new Date();
    this.note = note;
  }
}
export interface ITransaction extends Transaction {
  id: number;
  owner: User;
}
