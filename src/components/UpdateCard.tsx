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
import { useQueryClient } from "react-query";

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
  transaction?: ITransaction;
  handleCancel: any;
}) => {
  const formStartingData = props.transaction
    ? props.transaction
    : {
        amount: 0,
        category: "OTHER",
        note: "",
        date: new Date(),
      };

  const [category, setCategory] = useState(formStartingData.category);
  const [amount, setAmount] = useState(formStartingData.amount);
  const [note, setNote] = useState(formStartingData.note);
  const [date, setDate] = useState(formStartingData.date);

  const queryClient = useQueryClient();

  const createTransaction = async () => {
    const n = new Transaction(amount, category as CATEGORY, date, note);
    console.log(n);
    await n.save();
    queryClient.invalidateQueries();
    props.handleCancel();
  };

  const editTransaction = () => {};

  return (
    <Box sx={style}>
      <FormControl
        fullWidth
        sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        {/* // ! handle NaN */}
        <TextField
          required
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
        </TextField>

        <TextField
          label="Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <CRUDButtons.SaveButton
          handleSave={createTransaction}
          addOrUpdate={props.transaction ? "UPDATE" : "ADD"}
        />
        <CRUDButtons.CancelButton handleCancel={props.handleCancel} />
      </FormControl>
    </Box>
  );
};

export default UpdateCard;
