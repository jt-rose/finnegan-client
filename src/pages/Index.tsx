import { Transaction } from "../models/Transaction";
import { RecurringTransaction } from "../models/RecurringTransaction";
import { User } from "../models/User";

const Index = () => {
  const { isLoading, error, data } = User.useFetch();

  console.log(isLoading);
  console.log("data: ", data);
  console.log("error: ", error);

  const res = Transaction.useFetch(); //useGetTransactionsQuery();
  console.log("transaction: ", res.isLoading);
  console.log("transaction data: ", res.data);
  console.log("transaction error: ", res.error);

  const res2 = RecurringTransaction.useFetch();
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
