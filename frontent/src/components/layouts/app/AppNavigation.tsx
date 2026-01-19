import { styled } from "@mui/material/styles";
import MuiAppBar, {
  type AppBarProps as MuiAppBarProps,
} from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { drawerWidth } from "./DrawerNavigation";
import { useAuth } from "../../../context/AuthContext";
import { Button } from "@mui/material";
import { useState } from "react";
import Profile from "../../pages/profile/Profile";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const AppNavigation = ({ open, handleDrawerOpen }: any) => {
  const { user } = useAuth();
  const [openProfile, setOpenProfile] = useState(false);
  return (
    <>
      {openProfile && (
        <Profile
          open={openProfile}
          setOpenProfile={setOpenProfile}
          user={user}
        />
      )}
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ display: "flex" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={[
                {
                  marginRight: 5,
                },
                open && { display: "none" },
              ]}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Inventory & Sales Management System
            </Typography>
          </span>
          <span>
            Hello,
            <Button
              size="small"
              variant="outlined"
              onClick={() => setOpenProfile(true)}
              sx={{ color: "white" }}
            >
              {user?.name || user?.email}
            </Button>
          </span>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default AppNavigation;
