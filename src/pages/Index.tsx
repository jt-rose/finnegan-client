import { Transaction } from "../models/Transaction";
import { RecurringTransaction } from "../models/RecurringTransaction";
import { User } from "../models/User";

const Index = () => {
  //const userFetch = User.useFetch();
  const transactionFetch = Transaction.usePaginatedFetch();

  const recurringFetch = RecurringTransaction.useFetch();
  console.log("recurring data: ", recurringFetch.data);

  //   const createTransaction = () =>
  //     new Transaction(5000, "SHOPPING").save().then((data) => console.log(data));

  const sumFetch = Transaction.useTransactionSumFetch();
  console.log(sumFetch);
  return (
    <>
      <p>SUM: {sumFetch.data}</p>
      <button onClick={() => transactionFetch.fetchNextPage()}>
        load more
      </button>
      <p onClick={() => User.setGoal(50000, new Date())}>Index page</p>
      <ul>
        {transactionFetch.data &&
          transactionFetch.data.pages.map((page) =>
            page.content.map((pc) => <li>${pc.amount} </li>)
          )}
        {/* {res.data &&
          res.data.pages.map((page) =>
            (page.content as ITransaction[]).map((x) => (
              <li>
                {x.amount}
                {"  "}
                <span onClick={() => Transaction.edit({ ...x, amount: 1 })}>
                  Update
                </span>
                {"  "}
                <span onClick={() => Transaction.remove(x)}>X</span>
              </li>
            ))
          )} */}
      </ul>
    </>
  );
};

export default Index;
