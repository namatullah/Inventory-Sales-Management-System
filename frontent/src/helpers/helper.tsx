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
    label: "Product",
    path: "/product",
    icon: <Inventory2Outlined />,
    roles: ["admin", "staff"],
  },
  {
    label: "Category",
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
