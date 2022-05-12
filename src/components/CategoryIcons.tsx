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
      return <CategoryIcons.Groceries />;
    case "UTILITIES":
      return <CategoryIcons.Utilities />;
    case "HOME":
      return <CategoryIcons.Home />;
    case "SCHOOL":
      return <CategoryIcons.School />;
    case "TRANSPORTATION":
      return <CategoryIcons.Transportation />;
    case "MEDICAL":
      return <CategoryIcons.Medical />;
    case "ENTERTAINMENT":
      return <CategoryIcons.Entertainment />;
    case "SHOPPING":
      return <CategoryIcons.Shopping />;
    default:
      return <CategoryIcons.Other />;
  }
};
