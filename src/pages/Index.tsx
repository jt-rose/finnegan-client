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

  const userFetch = User.useFetch();

  const transactionFetch = Transaction.usePaginatedFetch();

  const recurringFetch = RecurringTransaction.useFetch();

  const sumFetch = Transaction.useTransactionSumFetch();

  const navigate = useNavigate();

  if (!userFetch.isLoading && userFetch.error) {
    navigate("/login");
  }

  const calculatedRecurringTransactions = recurringFetch.data
    ? RecurringTransaction.calculateRecurringTransactions(recurringFetch.data)
    : [];
  const recurringTransactionsSum = calculatedRecurringTransactions.reduce(
    (sum, recurring) => sum + recurring.totalAmount,
    0
  );

  const transactionSum =
    sumFetch.data && recurringFetch.data
      ? sumFetch.data + recurringTransactionsSum
      : "...loading";

  return (
    <>
      <Typography variant="h2">SUM: {transactionSum}</Typography>

      <TransactionTables
        transactions={
          transactionFetch.data
            ? transactionFetch.data.pages.flatMap((p) => p.content)
            : []
        }
      />
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
