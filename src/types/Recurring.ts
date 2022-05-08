import { Transaction } from "./Transaction";
import { User } from "./User";

class RecurringTransaction extends Transaction {
  startDate: Date;
  endDate: Date | null;
  cycle: string;
  constructor(
    amount: number,
    category: string,
    cycle: string,
    startDate: Date,
    endDate: Date | null,
    note?: string
  ) {
    super(amount, category, note);
    this.cycle = cycle;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
export interface IRecurringTransaction extends RecurringTransaction {
  id: number;
  owner: User;
}
