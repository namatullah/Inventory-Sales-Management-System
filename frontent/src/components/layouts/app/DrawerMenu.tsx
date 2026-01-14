import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { NavLink, useLocation } from "react-router-dom";

export interface MenuItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}
export const menuItems: MenuItem[] = [
  {
    label: "Dashboard",
    path: "/",
    icon: <MailIcon />,
  },
  {
    label: "Product",
    path: "/product",
    icon: <InboxIcon />,
  },
  {
    label: "Sales",
    path: "/sales",
    icon: <MailIcon />,
  },
  {
    label: "Category",
    path: "/category",
    icon: <InboxIcon />,
  },
  {
    label: "Users",
    path: "/users",
    icon: <MailIcon />,
  },
  {
    label: "Sign Out",
    path: "sginout",
    icon: <MailIcon />,
  },
];

const DrawerMenu = ({ open }: { open: boolean }) => {
  const location = useLocation();
  return (
    <List>
      {menuItems.map((text) => (
        <ListItem key={text.path} disablePadding sx={{ display: "block" }}>
          <ListItemButton
            selected={location.pathname === text.path}
            component={NavLink}
            to={text.path}
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
