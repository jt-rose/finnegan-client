import { Transaction } from "../models/Transaction";
import { RecurringTransaction } from "../models/RecurringTransaction";
import { User } from "../models/User";
import SimpleAccordion from "../components/TransactionAccordion";
import TransactionTables from "../components/TransactionTable";
import { Modal, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { CRUDButtons } from "../components/CrudButtons";
import UpdateCard from "../components/UpdateCard";
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
      <Typography variant="h2">SUM: {transactionSum}</Typography>

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
            <UpdateCard
              transaction={{
                id: -1,
                amount: 0,
                category: "OTHER",
                date: new Date(),
                owner: userFetch.data,
                note: "",
              }}
              addOrUpdate="ADD"
            />
          </Modal>
        </>
      )}
    </>
  );
};

export default Index;
