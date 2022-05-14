import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ITransaction, Transaction } from "../models/Transaction";
import { CategoryIcon } from "./CategoryIcons";
import { Box, Modal, Typography } from "@mui/material";
import { CRUDButtons } from "./CrudButtons";
import { useState } from "react";
import { useQueryClient } from "react-query";

const TransactionDate = (props: { date: Date }) => {
  const date = new Date(props.date);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return (
    <Typography variant="h5">
      {month} / {day} / {year}
    </Typography>
  );
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Row = (props: { transaction: ITransaction }) => {
  const { transaction } = props;
  const [openModal, setOpenModal] = useState(false);

  const queryClient = useQueryClient();

  const handleRemove = async () => {
    await Transaction.remove(transaction);
    queryClient.invalidateQueries();
    setOpenModal(false);
    // refresh query
  };
  return (
    <>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {transaction.amount}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            CATEGORY: {transaction.category}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            DATE: <TransactionDate date={transaction.date} />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            NOTE: {transaction.note ? transaction.note : "N/A"}
          </Typography>
          <CRUDButtons.CreateButton />
          <CRUDButtons.EditButton />
          <CRUDButtons.DeleteButton handleRemove={handleRemove} />
        </Box>
      </Modal>
      {/*  */}
      <StyledTableRow key={transaction.id} onClick={() => setOpenModal(true)}>
        <StyledTableCell component="th" scope="row">
          <Typography variant="h5">{transaction.amount}</Typography>
        </StyledTableCell>
        <StyledTableCell align="right">
          {/*transaction.category*/}
          <CategoryIcon category={transaction.category} />
        </StyledTableCell>
        <StyledTableCell align="right">
          <TransactionDate date={transaction.date} />
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
};

export default function TransactionTables(props: {
  transactions: ITransaction[];
}) {
  const [hasOpenModal, setOpenModal] = useState();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Amount</StyledTableCell>
            <StyledTableCell align="right">Category</StyledTableCell>
            <StyledTableCell align="right">Date</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.transactions.map((transaction) => (
            <Row transaction={transaction} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
