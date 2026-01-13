import Box from "@mui/material/Box";
import DrawerNavigation, { DrawerHeader } from "./app/DrawerNavigation";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <DrawerNavigation />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppLayout;
