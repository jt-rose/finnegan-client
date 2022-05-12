import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ITransaction } from "../models/Transaction";

export default function SimpleAccordion(props: {
  transactions: ITransaction[];
}) {
  return (
    <div>
      {props.transactions.map((tr) => (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>
              {tr.category} - {tr.amount} - {`${tr.date}`}
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Typography>NOTE: {tr.note ? tr.note : "N/A"}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
