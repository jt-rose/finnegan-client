import { Button, Tooltip } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const CreateButton = (props: { onClick: any }) => {
  return (
    <Button
      variant="contained"
      endIcon={<AddCircleOutlineIcon />}
      onClick={props.onClick}
    >
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

const EditButton = (props: { handleShowEdit: any }) => {
  return (
    <Button
      variant="contained"
      color="warning"
      endIcon={<EditIcon />}
      onClick={props.handleShowEdit}
    >
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

const SaveButton = (props: {
  handleSave: any;
  addOrUpdate: "ADD" | "UPDATE";
}) => {
  return (
    <Button
      onClick={props.handleSave}
      variant="contained"
      color="primary"
      endIcon={<SaveIcon />}
    >
      {props.addOrUpdate === "ADD" ? "Save" : "Update"}
    </Button>
  );
};

const CancelButton = (props: { handleCancel: any }) => {
  return (
    <Button
      onClick={props.handleCancel}
      variant="contained"
      color="error"
      endIcon={<HighlightOffIcon />}
    >
      Cancel
    </Button>
  );
};

export const CRUDButtons = {
  CreateButton,
  ReadMoreButton,
  EditButton,
  DeleteButton,
  SaveButton,
  CancelButton,
};
