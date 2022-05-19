import { Transaction } from "../models/Transaction";
import { RecurringTransaction } from "../models/RecurringTransaction";
import { User } from "../models/User";
import TransactionTables from "../components/TransactionTable";
import { Modal, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { CRUDButtons } from "../components/CrudButtons";
import TransactionForm from "../components/TransactionForm";
import { useState } from "react";

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
    ? RecurringTransaction.generateRecurringTransactions(recurringFetch.data)
    : null;

  const hasMoreTransactions = Transaction.hasMore(transactionFetch.data);

  const rt = calculatedRecurringTransactions
    ? calculatedRecurringTransactions.mergeAndSortAllTransactions(
        transactions,
        hasMoreTransactions
      )
    : [];

  console.log("tail: ", hasMoreTransactions);
  const transactionSum =
    sumFetch.data && calculatedRecurringTransactions
      ? sumFetch.data + calculatedRecurringTransactions.grandTotal
      : "...loading";

  return (
    <>
      <Typography variant="h2">SUM: {transactionSum}</Typography>

      <TransactionTables transactions={rt} />
      {hasMoreTransactions && (
        <button onClick={() => transactionFetch.fetchNextPage()}>
          load more
        </button>
      )}
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
