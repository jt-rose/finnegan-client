import { Transaction } from "../models/Transaction";
import { RecurringTransaction } from "../models/RecurringTransaction";
import { User } from "../models/User";

const Index = () => {
  const { isLoading, error, data } = User.useFetch();

  console.log(isLoading);
  console.log("data: ", data);
  console.log("error: ", error);

  const res = Transaction.useFetch();
  console.log("transaction data: ", res.data);

  const res2 = RecurringTransaction.useFetch();
  console.log("recurring data: ", res2.data);

  //   const createTransaction = () =>
  //     new Transaction(5000, "SHOPPING").save().then((data) => console.log(data));

  return (
    <>
      <p onClick={() => User.setGoal(50000, new Date())}>Index page</p>
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
