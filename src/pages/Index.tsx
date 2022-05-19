import { Transaction } from "../models/Transaction";
import { RecurringTransaction } from "../models/RecurringTransaction";
import { User } from "../models/User";
import TransactionTables from "../components/TransactionTable";
import { Modal, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { CRUDButtons } from "../components/CrudButtons";
import TransactionForm from "../components/TransactionForm";
import { useState } from "react";
import dayjs from "dayjs";

const Index = () => {
  const [displayCreateModal, setDisplayCreateModal] = useState(false);

  // fetch data
  const userFetch = User.useFetch();
  const transactionFetch = Transaction.usePaginatedFetch();
  const recurringFetch = RecurringTransaction.useFetch();
  const sumFetch = Transaction.useTransactionSumFetch();

  const navigate = useNavigate();

  // redirect to login if unauthenticated
  if (!userFetch.isLoading && userFetch.error) {
    navigate("/login");
  }

  // capture transactions across each page in a flat array
  // these transactions will already be sorted by date server-side
  const transactions = transactionFetch.data
    ? transactionFetch.data.pages.flatMap((p) => p.content)
    : [];

  // generate dates for each scheduled recurring transaction
  const calculatedRecurringTransactions = recurringFetch.data
    ? RecurringTransaction.calculateRecurringTransactions(recurringFetch.data)
    : [];

  // calculate sum of recurring transactions
  const recurringTransactionsSum = calculatedRecurringTransactions.reduce(
    (sum, recurring) => sum + recurring.totalAmount,
    0
  );

  // generate transactions based on dates of recurring transactions
  // ! limit by currently shown dates to optoimize
  // ! store data identifying these as recurring
  const rt = calculatedRecurringTransactions
    .map((x) => x.getSequenceOfTransactions())
    //   x.transactionDates.flatMap((tr) =>
    //     ({ ...x.recurringTransaction, date: tr })
    //   )
    // )
    .flat();
  console.log("rt: ", rt);

  // ! this is very hacky - create a proper interface later
  // ! place recurring at top of each date
  const combinedTransactions = [
    ...transactions,
    ...rt.map((r) => ({ ...r, id: -1, owner: userFetch.data! })),
  ] // ! compare just dates, remove times
    .map((x) => ({ ...x, date: new Date(x.date) }))
    .sort((x, y) => {
      //const comparison = x.date.get() - y.date.getTime();
      const compareYear = y.date.getUTCFullYear() - x.date.getUTCFullYear();
      const compareMonth = y.date.getUTCMonth() - x.date.getUTCMonth();
      const compareDate = y.date.getUTCDate() - x.date.getUTCDate();

      const comparison = compareYear + compareMonth + compareDate;
      console.log("comaparison: ", comparison);
      console.log("cycle in y? ", "cycle" in x);
      if (comparison === 0) {
        if ("cycle" in x && "cycle" in y) {
          return y.amount - x.amount;
        }

        if (!("cycle" in x) && !("cycle" in y)) {
          return y.amount - x.amount;
        }

        return "cycle" in y ? 1 : -1;
      }
      return comparison;
    });

  // ! filter out recurr-transactions if they are outside of the normal range of the regular transactions
  // ! combine them and visually organize by date

  const transactionSum =
    sumFetch.data && recurringFetch.data
      ? sumFetch.data + recurringTransactionsSum
      : "...loading";

  return (
    <>
      <Typography variant="h2">SUM: {transactionSum}</Typography>

      <TransactionTables transactions={combinedTransactions} />
      <button onClick={() => transactionFetch.fetchNextPage()}>
        load more
      </button>
      <p onClick={() => User.setGoal(50000, new Date())}>Set Goal</p>
      {userFetch.data && (
        <>
          <CRUDButtons.CreateButton
            onClick={() => setDisplayCreateModal(true)}
          />
          <Modal
            open={displayCreateModal}
            onClose={() => setDisplayCreateModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <TransactionForm
              // no transaction is provided
              // telling the form to create a new one
              // rather than edit an old one
              handleCancel={() => setDisplayCreateModal(false)}
            />
          </Modal>
        </>
      )}
    </>
  );
};

export default Index;
