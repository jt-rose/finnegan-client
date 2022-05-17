import { useQuery } from "react-query";
import { CATEGORY } from "../enums/CATEGORY";
import { CYCLE } from "../enums/CYCLE";
import { BASE_ROUTE } from "../queries/baseRoute";
import { get, post, put, remove } from "../queries/fetchers";
import { Transaction } from "./Transaction";
import { IUser } from "./User";
import dayjs from "dayjs";

export class RecurringTransaction extends Transaction {
  startDate: Date;
  endDate: Date | null;
  cycle: CYCLE;

  public static URL = BASE_ROUTE + "/recurring";

  save() {
    return post(RecurringTransaction.URL, {
      amount: this.amount,
      catgeory: this.category,
      date: this.date,
      note: this.note,
    });
  }

  public static get useFetch() {
    return () =>
      useQuery<IRecurringTransaction[], Error>("recurring", () =>
        get(RecurringTransaction.URL)
      );
  }

  private static formatDateObjects(
    recurringTransaction: IRecurringTransaction
  ) {
    const { startDate, endDate } = recurringTransaction;
    recurringTransaction.startDate = new Date(startDate);
    recurringTransaction.endDate = endDate ? new Date(endDate) : null;
    return recurringTransaction;
  }

  private static getNextDateInCycle(cycle: CYCLE, currentDate: Date): Date {
    switch (cycle) {
      case "DAILY":
        return dayjs(currentDate).add(1, "day").toDate();
      case "WEEKLY":
        return dayjs(currentDate).add(7, "day").toDate();
      case "MONTHLY": // need to check for how this handles 1/31 -> 2/28
        return dayjs(currentDate).add(1, "month").toDate();
      case "QUARTERLY":
        return dayjs(currentDate).add(3, "month").toDate();
      default:
        throw Error("Please provide a valid recurring transaction cycle");
    }
  }

  // get all viable days the a recurring transaction occurs on up to the present
  private static getDurationOfRecurringTransactionDays(
    recurringTransaction: IRecurringTransaction,
    nextDateToAdd: Date, // will use recurringTransaction.startDate to start with
    today: Date,
    daysTransactionOccurs: Date[] = []
  ): Date[] {
    // if current date is higher than today, stop adding and return results
    if (nextDateToAdd > today) {
      return daysTransactionOccurs;
    }

    // if endDate is earlier than nextDateToAdd, return current results
    if (
      recurringTransaction.endDate &&
      recurringTransaction.endDate < nextDateToAdd
    ) {
      return daysTransactionOccurs;
    }

    const followingDate = this.getNextDateInCycle(
      recurringTransaction.cycle,
      nextDateToAdd
    );
    const updatedTransactionDays = [...daysTransactionOccurs, nextDateToAdd];
    return this.getDurationOfRecurringTransactionDays(
      recurringTransaction,
      followingDate,
      today,
      updatedTransactionDays
    );
  }

  private static calculateRecurringTransaction(
    recurringTransaction: IRecurringTransaction,
    today: Date
  ) {
    recurringTransaction = this.formatDateObjects(recurringTransaction);

    const transactionDates = this.getDurationOfRecurringTransactionDays(
      recurringTransaction,
      recurringTransaction.startDate,
      new Date()
    );

    return {
      recurringTransaction,
      transactionDates,
      totalAmount: recurringTransaction.amount * transactionDates.length,
    };
  }

  public static calculateRecurringTransactions(
    recurringTransactions: IRecurringTransaction[]
  ) {
    const today = new Date();
    return recurringTransactions.map((rt) =>
      this.calculateRecurringTransaction(rt, today)
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
    category: CATEGORY,
    cycle: CYCLE,
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
  owner: IUser;
}
