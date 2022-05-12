import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ITransaction } from "../models/Transaction";
import { CategoryIcon } from "./CategoryIcons";
import { Typography } from "@mui/material";

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

export default function TransactionTables(props: {
  transactions: ITransaction[];
}) {
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
            <StyledTableRow key={transaction.id}>
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
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
