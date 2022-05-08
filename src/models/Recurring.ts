import { useQuery } from "react-query";
import { BASE_ROUTE } from "../queries/baseRoute";
import { get, post, put, remove } from "../queries/fetchers";
import { Transaction } from "./Transaction";
import { User } from "./User";

class RecurringTransaction extends Transaction {
  startDate: Date;
  endDate: Date | null;
  cycle: string;

  public static URL = BASE_ROUTE + "/recurring";

  save() {
    return post(RecurringTransaction.URL, {
      amount: this.amount,
      catgeory: this.category,
      date: this.date,
      note: this.note,
    });
  }

  public static get fetch() {
    return () =>
      useQuery<IRecurringTransaction[], Error>("recurring", () =>
        get(RecurringTransaction.URL)
      );
  }

  public static edit(recurringTransaction: IRecurringTransaction) {
    return put(
      RecurringTransaction.URL + "/" + recurringTransaction.id,
      recurringTransaction
    );
  }

  public static remove(recurringTransaction: IRecurringTransaction) {
    return remove(RecurringTransaction.URL + "/" + recurringTransaction.id);
  }

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
