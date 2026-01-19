import type { MenuItem } from "./types";
import {
  CategoryOutlined,
  DashboardOutlined,
  Inventory2Outlined,
  LoginOutlined,
  PeopleOutline,
  SellOutlined,
} from "@mui/icons-material";

export const menuItems: MenuItem[] = [
  {
    label: "Dashboard",
    path: "/",
    icon: <DashboardOutlined />,
    roles: ["admin", "staff"],
  },
  {
    label: "Sales",
    path: "/sales",
    icon: <SellOutlined />,
    roles: ["admin", "staff"],
  },
  {
    label: "Products",
    path: "/product",
    icon: <Inventory2Outlined />,
    roles: ["admin", "staff"],
  },
  {
    label: "Categories",
    path: "/category",
    icon: <CategoryOutlined />,
    roles: ["admin"],
  },
  {
    label: "Users",
    path: "/users",
    icon: <PeopleOutline />,
    roles: ["admin"],
  },
  {
    label: "Logout",
    path: "logout",
    icon: <LoginOutlined />,
    roles: ["admin", "staff"],
  },
];
export const PAGINATION = {
  PAGE: 0,
  ROWS_PER_PAGE: 5,
  ROWS_PER_PAGE_OPTIONS: [5, 10],
};

export const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28BFE",
  "#FF6699",
];
export const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function getColor(index: number) {
  return COLORS[index % COLORS.length];
}
export const USER_ROLE = {
  ADMIN: "admin",
  STAFF: "staff",
};
