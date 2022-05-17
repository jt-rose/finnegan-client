import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Box } from "@mui/system";
import { useState } from "react";
import { CATEGORY, categoryList } from "../enums/CATEGORY";
import { ITransaction, Transaction } from "../models/Transaction";
import { CRUDButtons } from "./CrudButtons";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const UpdateCard = (props: {
  transaction: ITransaction;
  addOrUpdate: "ADD" | "UPDATE";
}) => {
  const { transaction, addOrUpdate } = props;
  const [category, setCategory] = useState(transaction.category);
  const [amount, setAmount] = useState(transaction.amount);
  const [note, setNote] = useState(transaction.note);
  const [date, setDate] = useState(transaction.date);

  return (
    <Box sx={style}>
      <FormControl
        fullWidth
        sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        {/* // ! handle NaN */}
        <TextField
          label="Amount"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
        />

        <DatePicker
          label="Date"
          value={date}
          onChange={(newValue) => {
            setDate(newValue as Date);
          }}
          renderInput={(params) => <TextField {...params} />}
        />

        <TextField
          select
          id="transaction-category-select"
          value={category}
          label="Category"
          onChange={(e) => setCategory(e.target.value as CATEGORY)}
        >
          {categoryList.map((c) => (
            <MenuItem key={c + "-select"} value={c}>
              {c}
            </MenuItem>
          ))}
          {/* <MenuItem value={"GROCERIES"}>Groceries</MenuItem>
          <MenuItem value={"UTILITIES"}>Utilities</MenuItem>
          <MenuItem value={"HOME"}>Home</MenuItem>
          <MenuItem value={"SCHOOL"}>School</MenuItem>
          <MenuItem value={"TRANSPORTATION"}>Transportation</MenuItem>
          <MenuItem value={"MEDICAL"}>Medical</MenuItem>
          <MenuItem value={"ENTERTAINMENT"}>Entertainment</MenuItem>
          <MenuItem value={"SHOPPING"}>Shopping</MenuItem>
          <MenuItem value={"OTHER"}>Other</MenuItem> */}
        </TextField>

        <TextField
          label="Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <CRUDButtons.SaveButton
          handleSave={() => {}}
          addOrUpdate={addOrUpdate}
        />
        <CRUDButtons.CancelButton handleCancel={() => {}} />
      </FormControl>
    </Box>
  );
};

export default UpdateCard;
