import { Transaction } from "../models/Transaction";
import { RecurringTransaction } from "../models/RecurringTransaction";
import { User } from "../models/User";

const Index = () => {
  const { isLoading, error, data } = User.useFetch();

  console.log(isLoading);
  console.log("data: ", data);
  console.log("error: ", error);
  const res = Transaction.usePaginatedFetch();

  const { fetchNextPage } = res;
  console.log("pagget2", Object.keys(res));
  console.log("transaction data: ", res);
  console.log("pages: ", res.data);
  console.log("fnp", fetchNextPage);

  const res2 = RecurringTransaction.useFetch();
  console.log("recurring data: ", res2.data);

  //   const createTransaction = () =>
  //     new Transaction(5000, "SHOPPING").save().then((data) => console.log(data));

  //Transaction.getTransactionSum().then((data) => console.log(data));

  return (
    <>
      <button onClick={() => res.fetchNextPage()}>load more</button>
      <p onClick={() => User.setGoal(50000, new Date())}>Index page</p>
      <ul>
        {res.data &&
          res.data.pages.map((page) =>
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
