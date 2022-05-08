import axios from "axios";
import { useMutation } from "react-query";
import { post } from "../queries/fetchers";
import { useGetRecurringTransactionsQuery } from "../queries/recurringTransactionController";
import { useGetUserQuery } from "../queries/userController";
import { ITransaction, Transaction } from "../models/Transaction";

const Index = () => {
  const { isLoading, error, data } = useGetUserQuery();

  console.log(isLoading);
  console.log("data: ", data);
  console.log("error: ", error);

  const res = Transaction.fetch(); //useGetTransactionsQuery();
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

  //const ct = useCreateTransactionMutation();
  const createTransaction = () =>
    new Transaction(5000, "SHOPPING").save().then((data) => console.log(data));

  return (
    <>
      <p onClick={createTransaction}>Index page</p>
      <ul>
        {res.data &&
          res.data.map((x) => (
            <li>
              {x.amount}
              {"  "}
              <span onClick={() => Transaction.edit({ ...x, amount: 1 })}>
                Update
              </span>
              {"  "}
              <span onClick={() => Transaction.remove(x)}>X</span>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Index;
