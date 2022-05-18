import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Box } from "@mui/system";
import { useState } from "react";
import { CATEGORY, categoryList } from "../enums/CATEGORY";
import { ITransaction, Transaction } from "../models/Transaction";
import { CRUDButtons } from "./CrudButtons";
import { useQueryClient } from "react-query";
import { CYCLE, cycleList } from "../enums/CYCLE";

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

const TransactionForm = (props: {
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
  const [startDate, setStartDate] = useState(formStartingData.date);
  const [endDate, setEndDate] = useState(formStartingData.date);
  const [cycle, setCycle] = useState("DAILY");
  const [isRecurring, setIsRecurring] = useState(false);

  const queryClient = useQueryClient();

  const createTransaction = async () => {
    // create and persist new transaction
    await new Transaction(amount, category as CATEGORY, date, note).save();

    // reset query cache to trigger updates
    queryClient.invalidateQueries();

    // trigger function to hide modal
    props.handleCancel();
  };

  const editTransaction = () => {};

  return (
    <Box sx={style}>
      <FormControl
        fullWidth
        sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <FormControlLabel
          control={
            <Switch
              checked={isRecurring}
              onChange={() => setIsRecurring(!isRecurring)}
            />
          }
          label="Recurring"
        />

        {/* // ! handle NaN */}
        <TextField
          required
          label="Amount"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
        />

        {!isRecurring && (
          <DatePicker
            label="Date"
            value={date}
            onChange={(newValue) => {
              setDate(newValue as Date);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        )}

        {isRecurring && (
          <>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => {
                setStartDate(newValue as Date);
              }}
              renderInput={(params) => <TextField {...params} />}
            />

            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => {
                setEndDate(newValue as Date);
              }}
              renderInput={(params) => <TextField {...params} />}
            />

            <TextField
              select
              id="recurring-cycle-select"
              value={cycle}
              label="Frequency"
              onChange={(e) => setCycle(e.target.value as CYCLE)}
            >
              {cycleList.map((c) => (
                <MenuItem key={c + "-select"} value={c}>
                  {c}
                </MenuItem>
              ))}
            </TextField>
          </>
        )}

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

export default TransactionForm;
