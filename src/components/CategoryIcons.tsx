import { Tooltip } from "@mui/material";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import PaidIcon from "@mui/icons-material/Paid";
import { CATEGORY } from "../enums/CATEGORY";

const CategoryIcons = {
  Groceries: LocalGroceryStoreIcon,
  Utilities: ElectricBoltIcon,
  Home: HomeIcon,
  School: SchoolIcon,
  Transportation: DirectionsCarIcon,
  Medical: MedicalServicesIcon,
  Entertainment: TheaterComedyIcon,
  Shopping: ShoppingBasketIcon,
  Other: PaidIcon,
};

export const CategoryIcon = (props: { category: CATEGORY }) => {
  switch (props.category) {
    case "GROCERIES":
      return (
        <Tooltip title="Groceries">
          <CategoryIcons.Groceries />
        </Tooltip>
      );
    case "UTILITIES":
      return (
        <Tooltip title="Utilities">
          <CategoryIcons.Utilities />
        </Tooltip>
      );
    case "HOME":
      return (
        <Tooltip title="Home">
          <CategoryIcons.Home />
        </Tooltip>
      );
    case "SCHOOL":
      return (
        <Tooltip title="School">
          <CategoryIcons.School />
        </Tooltip>
      );
    case "TRANSPORTATION":
      return (
        <Tooltip title="Transportation">
          <CategoryIcons.Transportation />
        </Tooltip>
      );
    case "MEDICAL":
      return (
        <Tooltip title="Medical">
          <CategoryIcons.Medical />
        </Tooltip>
      );
    case "ENTERTAINMENT":
      return (
        <Tooltip title="Entertainment">
          <CategoryIcons.Entertainment />
        </Tooltip>
      );
    case "SHOPPING":
      return (
        <Tooltip title="Shopping">
          <CategoryIcons.Shopping />
        </Tooltip>
      );
    default:
      return (
        <Tooltip title="Other">
          <CategoryIcons.Other />
        </Tooltip>
      );
  }
};
