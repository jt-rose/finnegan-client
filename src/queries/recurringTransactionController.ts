import { get } from "../queries/fetchers";
import { useQuery } from "react-query";
import { RECURRING_TRANSACTIONS_ROUTE } from "./routes";
import { IRecurringTransaction } from "../models/Recurring";

export const useGetRecurringTransactionsQuery = () => {
  return useQuery<IRecurringTransaction, Error>("recurring", () =>
    get(RECURRING_TRANSACTIONS_ROUTE)
  );
};

// useCreateTransactionMutation

// useEditTransactionMutation

// useDeleteTransactionMutation
