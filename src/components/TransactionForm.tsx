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

const TransactionForm = (props: {
  transaction?: ITransaction | IRecurringTransaction;
  handleCancel: any;
}) => {
  const formStartingData = props.transaction
    ? props.transaction
    : {
        amount: 0,
        category: "OTHER",
        note: "",
        date: new Date(),
        startDate: new Date(),
        endDate: null,
        cycle: "DAILY" as CYCLE,
      };

  const [category, setCategory] = useState(formStartingData.category);
  const [amount, setAmount] = useState(formStartingData.amount);
  const [note, setNote] = useState(formStartingData.note);
  const [date, setDate] = useState(formStartingData.date);
  const [startDate, setStartDate] = useState(
    "startDate" in formStartingData ? formStartingData.startDate : new Date()
  );
  const [endDate, setEndDate] = useState<Date | null>(
    "endDate" in formStartingData ? formStartingData.endDate : null
  );
  const [cycle, setCycle] = useState<CYCLE>(
    "cycle" in formStartingData ? formStartingData.cycle : "DAILY"
  );
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

  const createRecurringTransaction = async () => {
    // create and persist new transaction
    await new RecurringTransaction(
      amount,
      category as CATEGORY,
      cycle,
      startDate,
      endDate,
      note
    ).save();

    // reset query cache to trigger updates
    queryClient.invalidateQueries();

    // trigger function to hide modal
    props.handleCancel();
  };

  // ! discern edit trasaction and editRecurringTransaction
  const editTransaction = props.transaction
    ? async () => {
        // set transaction values to currently selected options
        const updatedTransaction = props.transaction!;
        updatedTransaction.amount = amount;
        updatedTransaction.category = category as CATEGORY;
        updatedTransaction.date = date;
        updatedTransaction.note = note;

        // edit transaction in database
        await Transaction.edit(updatedTransaction);

        // reset query cache to trigger updates
        queryClient.invalidateQueries();

        // trigger function to hide modal
        props.handleCancel();
      }
    : async () => {};

  const editRecurringTransaction =
    props.transaction && "cycle" in props.transaction
      ? async () => {
          // set transaction values to currently selected options
          const updatedTransaction = props.transaction as IRecurringTransaction;
          updatedTransaction.amount = amount;
          updatedTransaction.category = category as CATEGORY;
          updatedTransaction.date = date;
          updatedTransaction.note = note;
          updatedTransaction.cycle = cycle;
          updatedTransaction.startDate = startDate;
          updatedTransaction.endDate = endDate;

          // edit recurring transaction in database
          await RecurringTransaction.edit(updatedTransaction);

          // reset query cache to trigger updates
          queryClient.invalidateQueries();

          // trigger function to hide modal
          props.handleCancel();
        }
      : editTransaction;

  let save = createTransaction;

  if (props.transaction) {
    if (isRecurring) {
      save = editRecurringTransaction;
    } else {
      save = editTransaction;
    }
  } else {
    if (isRecurring) {
      save = createRecurringTransaction;
    }
  }

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

            {/* <TextField
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
            </TextField> */}

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
              {/* <ToggleButton
                value="left"
                aria-label="left aligned"
                sx={{ width: "120px" }}
              >
                <Typography>DAILY</Typography>
              </ToggleButton>
              <ToggleButton
                value="center"
                aria-label="centered"
                sx={{ width: "120px" }}
              >
                <Typography>WEEKLY</Typography>
              </ToggleButton>
              <ToggleButton
                value="right"
                aria-label="right aligned"
                sx={{ width: "120px" }}
              >
                <Typography>MONTHLY</Typography>
              </ToggleButton>
              <ToggleButton
                value="justify"
                aria-label="justified"
                sx={{ width: "120px" }}
              >
                <Typography>QUARTERLY</Typography>
              </ToggleButton> */}
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
