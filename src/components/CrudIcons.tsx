import { Tooltip } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Edit from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const CreateIcon = () => {
  return (
    <Tooltip title="Add">
      <AddCircleOutlineIcon />
    </Tooltip>
  );
};

const ReadMoreIcon = () => {
  return (
    <Tooltip title="Show more">
      <MoreHorizIcon />
    </Tooltip>
  );
};

const EditIcon = () => {
  return (
    <Tooltip title="Edit">
      <Edit />
    </Tooltip>
  );
};

const DeleteIcon = () => {
  return (
    <Tooltip title="Delete">
      <HighlightOffIcon />
    </Tooltip>
  );
};

export const CRUDIcons = {
  CreateIcon,
  ReadMoreIcon,
  EditIcon,
  DeleteIcon,
};
