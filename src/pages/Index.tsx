import { Transaction } from "../models/Transaction";
import { RecurringTransaction } from "../models/RecurringTransaction";
import { User } from "../models/User";
import SimpleAccordion from "../components/TransactionAccordion";
import TransactionTables from "../components/TransactionTable";

const Index = () => {
  //const userFetch = User.useFetch();
  const transactionFetch = Transaction.usePaginatedFetch();

  const recurringFetch = RecurringTransaction.useFetch();
  console.log("recurring data: ", recurringFetch.data);

  const rt = recurringFetch.data
    ? RecurringTransaction.calculateRecurringTransactions(recurringFetch.data)
    : [];
  console.log("recurring calc: ", rt);
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
      <TransactionTables
        transactions={
          transactionFetch.data
            ? transactionFetch.data.pages.flatMap((p) => p.content)
            : []
        }
      />
      <SimpleAccordion
        transactions={
          transactionFetch.data
            ? transactionFetch.data.pages.flatMap((p) => p.content)
            : []
        }
      />
      <p onClick={() => User.setGoal(50000, new Date())}>Set Goal</p>
    </>
  );
};

export default Index;
