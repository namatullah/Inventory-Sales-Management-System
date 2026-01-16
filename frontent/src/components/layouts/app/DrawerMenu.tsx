import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useAuth } from "../../../context/AuthContext";
import { CategoryOutlined, DashboardOutlined, Inventory2Outlined, LoginOutlined, PeopleOutline, SellOutlined } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

export interface MenuItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}
export const menuItems: MenuItem[] = [
  {
    label: "Dashboard",
    path: "/",
    icon: <DashboardOutlined />,
  },
  {
    label: "Product",
    path: "/product",
    icon: <Inventory2Outlined />,
  },
  {
    label: "Sales",
    path: "/sales",
    icon: <SellOutlined />,
  },
  {
    label: "Category",
    path: "/category",
    icon: <CategoryOutlined />,
  },
  {
    label: "Users",
    path: "/users",
    icon: <PeopleOutline />,
  },
  {
    label: "Logout",
    path: "logout",
    icon: <LoginOutlined />,
  },
];

const DrawerMenu = ({ open }: { open: boolean }) => {
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleNavigation = (path: string) => {
    path === "logout" ? logout() : navigate(path);
  };
  return (
    <List>
      {menuItems.map((text) => (
        <ListItem key={text.path} disablePadding sx={{ display: "block" }}>
          <ListItemButton
            selected={location.pathname === text.path}
            onClick={() => handleNavigation(text.path)}
            sx={[
              {
                minHeight: 48,
                px: 2.5,
              },
              open
                ? {
                    justifyContent: "initial",
                  }
                : {
                    justifyContent: "center",
                  },
            ]}
          >
            <ListItemIcon
              sx={[
                {
                  minWidth: 0,
                  justifyContent: "center",
                },
                open
                  ? {
                      mr: 3,
                    }
                  : {
                      mr: "auto",
                    },
              ]}
            >
              {text.icon}
            </ListItemIcon>
            <ListItemText
              primary={text.label}
              sx={[
                open
                  ? {
                      opacity: 1,
                    }
                  : {
                      opacity: 0,
                    },
              ]}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default DrawerMenu;
