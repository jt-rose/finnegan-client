import { Transaction } from "../models/Transaction";
import { RecurringTransaction } from "../models/RecurringTransaction";
import { User } from "../models/User";
import SimpleAccordion from "../components/TransactionAccordion";
import TransactionTables from "../components/TransactionTable";

const Index = () => {
  //const userFetch = User.useFetch();
  const transactionFetch = Transaction.usePaginatedFetch();

  const recurringFetch = RecurringTransaction.useFetch();

  const sumFetch = Transaction.useTransactionSumFetch();

  const allDataLoaded =
    transactionFetch.data && recurringFetch.data && sumFetch.data;

  console.log("recurring data: ", recurringFetch.data);

  const calculatedRecurringTransactions = recurringFetch.data
    ? RecurringTransaction.calculateRecurringTransactions(recurringFetch.data)
    : [];
  const recurringTransactionsSum = calculatedRecurringTransactions.reduce(
    (sum, recurring) => sum + recurring.totalAmount,
    0
  );

  console.log("recurring calc: ", calculatedRecurringTransactions);
  //   const createTransaction = () =>
  //     new Transaction(5000, "SHOPPING").save().then((data) => console.log(data));

  console.log("sumFetch: ", sumFetch);
  console.log("rt-sum: ", recurringTransactionsSum);

  const transactionSum =
    sumFetch.data && recurringFetch.data
      ? sumFetch.data + recurringTransactionsSum
      : "...loading";
  return (
    <>
      <p>SUM: {transactionSum}</p>
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
      {/* <SimpleAccordion
        transactions={
          transactionFetch.data
            ? transactionFetch.data.pages.flatMap((p) => p.content)
            : []
        }
      /> */}
      <p onClick={() => User.setGoal(50000, new Date())}>Set Goal</p>
    </>
  );
};

export default Index;
