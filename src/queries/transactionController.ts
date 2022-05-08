import { get, post } from "../queries/fetchers";
import { useMutation, useQuery } from "react-query";
import { TRANSACTION_ROUTE } from "./routes";
import { ITransaction, Transaction } from "../types/Transaction";
import axios from "axios";

export const useGetTransactionsQuery = () => {
  return useQuery<ITransaction[], Error>("transactions", () =>
    get(TRANSACTION_ROUTE)
  );
};

// useCreateTransactionMutation
export const useCreateTransactionMutation = () => {
  return useMutation(
    (transaction: Transaction) => post(TRANSACTION_ROUTE, transaction),
    { onSuccess: (data) => console.log(data) }
  );
};

export const createTransaction = (transaction: Transaction) =>
  post(TRANSACTION_ROUTE, transaction);

// useEditTransactionMutation

// useDeleteTransactionMutation
