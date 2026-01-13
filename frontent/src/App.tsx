import Box from "@mui/material/Box";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./components/pages/Product";
import DrawerNavigation, { DrawerHeader } from "./components/layouts/DrawerNavigation";

export default function App() {
  return (
    <BrowserRouter>
      <Box sx={{ display: "flex" }}>
        <DrawerNavigation />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Routes>
            <Route path="/product" element={<Product />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
}
