import axios from "axios";
import { useMutation } from "react-query";
import { post } from "../queries/fetchers";
import { useGetRecurringTransactionsQuery } from "../queries/recurringTransactionController";
import { TRANSACTION_ROUTE } from "../queries/routes";
import {
  useCreateTransactionMutation,
  useGetTransactionsQuery,
} from "../queries/transactionController";
import { useGetUserQuery } from "../queries/userController";
import { ITransaction, Transaction } from "../types/Transaction";

const Index = () => {
  const { isLoading, error, data } = useGetUserQuery();

  console.log(isLoading);
  console.log("data: ", data);
  console.log("error: ", error);

  const res = useGetTransactionsQuery();
  console.log("transaction: ", res.isLoading);
  console.log("transaction data: ", res.data);
  console.log("transaction error: ", res.error);

  const res2 = useGetRecurringTransactionsQuery();
  console.log("recurring: ", res2.isLoading);
  console.log("recurring data: ", res2.data);
  console.log("recurring error: ", res2.error);

  //   const createTransaction = useMutation(
  //     (payload: { transaction: Transaction; token: string }) =>
  //       axios.post(TRANSACTION_ROUTE, payload.transaction, {
  //         headers: { Authorization: "Bearer " + payload.token },
  //       }),
  //     { onSuccess: (data) => console.log(data) }
  //   );

  const ct = useCreateTransactionMutation();

  return (
    <p onClick={() => ct.mutate(new Transaction(5000, "SHOPPING"))}>
      Index page
    </p>
  );
};

export default Index;
