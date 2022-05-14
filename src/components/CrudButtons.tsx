import { Button, Tooltip } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const CreateButton = () => {
  return (
    <Button variant="contained" endIcon={<AddCircleOutlineIcon />}>
      Create
    </Button>
  );
};

const ReadMoreButton = () => {
  return (
    <Tooltip title="Show more">
      <MoreHorizIcon />
    </Tooltip>
  );
};

const EditButton = () => {
  return (
    <Button variant="contained" color="warning" endIcon={<EditIcon />}>
      Edit
    </Button>
  );
};

const DeleteButton = (props: { handleRemove: any }) => {
  return (
    <Button
      onClick={props.handleRemove}
      variant="contained"
      color="error"
      endIcon={<HighlightOffIcon />}
    >
      Delete
    </Button>
  );
};

export const CRUDButtons = {
  CreateButton,
  ReadMoreButton,
  EditButton,
  DeleteButton,
};
