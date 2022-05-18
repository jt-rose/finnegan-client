import {
  FormControl,
  FormControlLabel,
  MenuItem,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Box } from "@mui/system";
import { useState } from "react";
import { CATEGORY, categoryList } from "../enums/CATEGORY";
import { ITransaction, Transaction } from "../models/Transaction";
import { CRUDButtons } from "./CrudButtons";
import { useQueryClient } from "react-query";
import { CYCLE, cycleList } from "../enums/CYCLE";
import {
  IRecurringTransaction,
  RecurringTransaction,
} from "../models/RecurringTransaction";

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

// default form data to use if no transaction / recurring transaction
// is provided
const defaultFormData = {
  amount: 0,
  category: "OTHER",
  note: "",
  date: new Date(),
  startDate: new Date(),
  endDate: null,
  cycle: "DAILY" as CYCLE,
};

// the transaction prop can be null, a Transaction,
// or a Recurring Transaction

// if null, the form will be used to create a new Transaction
// or Recurring Transaction

// otherwise, the form will be used to edit an existing Transaction
// or Recurring Transaction, based on which type is received
const TransactionForm = (props: {
  transaction?: ITransaction | IRecurringTransaction;
  handleCancel: any;
}) => {
  // set up initial form data based on props or default settings
  const formStartingData = props.transaction
    ? props.transaction
    : defaultFormData;

  // if transaction prop is not a recurring transaction
  // provide default values for cycle and start / end dates
  const defaultStartDate =
    "startDate" in formStartingData ? formStartingData.startDate : new Date();
  const defaultEndDate =
    "endDate" in formStartingData ? formStartingData.endDate : null;
  const defaultCycle =
    "cycle" in formStartingData ? formStartingData.cycle : "DAILY";

  // set isRecurring state to true when receiving Recurring Transaction via props
  const defaultRecurringState = "cycle" in formStartingData;

  // set up form state
  const [category, setCategory] = useState(formStartingData.category);
  const [amount, setAmount] = useState(formStartingData.amount);
  const [note, setNote] = useState(formStartingData.note);
  const [date, setDate] = useState(formStartingData.date);
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState<Date | null>(defaultEndDate);
  const [cycle, setCycle] = useState<CYCLE>(defaultCycle);
  const [isRecurring, setIsRecurring] = useState(defaultRecurringState);

  // set up query client for invalidating cache upon updates
  const queryClient = useQueryClient();

  // set up create function to add a Transaction
  // or Recurring Transaction based on "isRecurring" boolean
  const createTransaction = async () => {
    // create and persist new transaction or recurring transaction
    if (isRecurring) {
      await new RecurringTransaction(
        amount,
        category as CATEGORY,
        cycle,
        startDate,
        endDate,
        note
      ).save();
    } else {
      await new Transaction(amount, category as CATEGORY, date, note).save();
    }

    // reset query cache to trigger updates
    queryClient.invalidateQueries();

    // trigger function to hide modal
    props.handleCancel();
  };

  // set up edit function that updates either a Transaction
  // or Recurring Transaction based on the type recieved
  // and can fall back to a type-safe () => {} placeholder
  // when the transaction prop is null
  const editTransaction = props.transaction
    ? async () => {
        // set transaction values to currently selected options
        const updatedTransaction = props.transaction!;
        updatedTransaction.amount = amount;
        updatedTransaction.category = category as CATEGORY;
        updatedTransaction.date = date;
        updatedTransaction.note = note;

        // if recurring transaction, update values specific to that type
        // and edit the recurring transaction
        if ("cycle" in updatedTransaction) {
          updatedTransaction.cycle = cycle;
          updatedTransaction.startDate = startDate;
          updatedTransaction.endDate = endDate;

          await RecurringTransaction.edit(updatedTransaction);

          // if normal transaction, edit normal transaction
        } else {
          await Transaction.edit(updatedTransaction);
        }

        // reset query cache to trigger updates
        queryClient.invalidateQueries();

        // trigger function to hide modal
        props.handleCancel();
      }
    : async () => {};

  // pick whether to create or edit based on if transaction was passed in via props
  const save = props.transaction ? editTransaction : createTransaction;

  // handle select behavior for recurring transaction frequency
  const handleCycle = (
    event: React.MouseEvent<HTMLElement>,
    newCycle: string | null
  ) => {
    if (newCycle) {
      setCycle(newCycle as CYCLE);
    }
  };

  return (
    <Box sx={style}>
      <FormControl
        fullWidth
        sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        {/* // ! only show switch when creating, not updating 
        automatically set isRecurring based on type of transaction when updating
        a transaction that already exists
        */}
        {!props.transaction && (
          <FormControlLabel
            control={
              <Switch
                checked={isRecurring}
                onChange={() => setIsRecurring(!isRecurring)}
              />
            }
            label="Recurring"
          />
        )}

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

            <ToggleButtonGroup
              value={cycle}
              exclusive
              onChange={handleCycle}
              aria-label="frequency"
              sx={{ display: "flex" }}
            >
              {cycleList.map((c) => (
                <ToggleButton
                  value={c}
                  aria-label={c}
                  sx={{ width: "120px" }}
                  key={c + "-select"}
                >
                  <Typography>{c}</Typography>
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
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
          handleSave={save}
          addOrUpdate={props.transaction ? "UPDATE" : "ADD"}
        />
        <CRUDButtons.CancelButton handleCancel={props.handleCancel} />
      </FormControl>
    </Box>
  );
};

export default TransactionForm;
