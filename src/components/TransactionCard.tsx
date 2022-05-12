import { ITransaction } from "../models/Transaction";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export const TransactionCard = (props: { transaction: ITransaction }) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.transaction.category}
        </Typography>
        <Typography variant="h5" component="div">
          {props.transaction.amount}
        </Typography>
        <Typography sx={{ mb: 0.2 }} color="text.secondary">
          {`${props.transaction.date}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};
