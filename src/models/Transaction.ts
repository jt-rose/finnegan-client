import {
  InfiniteData,
  QueryClient,
  useInfiniteQuery,
  useQuery,
} from "react-query";
import { CATEGORY } from "../enums/CATEGORY";
import { BASE_ROUTE } from "../queries/baseRoute";
import { get, post, put, remove } from "../queries/fetchers";
import { IUser } from "./User";

// The Transaction class is used to construct a Transaction entity
// and the ITransaction interface references a Transaction
// that has been stored in the database and been assigned
// a transaction id and associated owner
export class Transaction {
  amount: number;
  category: CATEGORY;
  date: Date;
  note?: string;
  public static URL = BASE_ROUTE + "/transactions";

  save() {
    console.log("this cat: ", this.category);
    return post(Transaction.URL, {
      amount: this.amount,
      category: this.category,
      date: this.date,
      note: this.note,
    });
  }

  public static formatDate(transaction: ITransaction) {
    // convert to date object in case currently date-string
    const date = new Date(transaction.date);

    // get month day and year
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} / ${day} / ${year}`;
  }

  public static get useFetch() {
    return () =>
      useQuery<ITransaction[], Error>("transactions", () =>
        get(Transaction.URL)
      );
  }

  public static get usePaginatedFetch() {
    return () =>
      useInfiniteQuery<
        {
          content: ITransaction[];
          pageable: { pageNumber: number };
          last: boolean;
        },
        Error
      >(
        "paginatedTransactions",
        ({ pageParam = 0 }) =>
          get(Transaction.URL + `/paginated?page=${pageParam}&size=3`),
        {
          //keepPreviousData: true,
          getNextPageParam: (lastPage) => {
            return lastPage.pageable.pageNumber + 1;
          },
        }
      );
  }

  public static hasMore(
    transactionFetchData: //ReturnType<typeof Transaction.usePaginatedFetch>
    | InfiniteData<{
          content: ITransaction[];
          pageable: {
            pageNumber: number;
          };
          last: boolean;
        }>
      | undefined
  ) {
    if (transactionFetchData) {
      return !transactionFetchData.pages[transactionFetchData.pages.length - 1]
        .last;
    }
    return true;
  }

  public static get useTransactionSumFetch() {
    return () =>
      useQuery<number, Error>("transactionSum", () =>
        get(Transaction.URL + "/sum")
      );
  }

  public static edit(transaction: ITransaction) {
    return put(Transaction.URL + "/" + transaction.id, transaction);
  }

  public static remove(transaction: ITransaction) {
    return remove(Transaction.URL + "/" + transaction.id);
  }

  constructor(amount: number, category: CATEGORY, date: Date, note?: string) {
    this.amount = amount;
    this.category = category;
    this.date = date;
    this.note = note;
  }
}
export interface ITransaction extends Omit<Transaction, "save"> {
  readonly id: number;
  owner: IUser;
}
