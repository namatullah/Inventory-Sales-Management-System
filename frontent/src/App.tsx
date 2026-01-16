import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./components/pages/product/Product";
import AppLayout from "./components/layouts/AppLayout";
import AuthLayout from "./components/layouts/AuthLayout";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Dashboard from "./components/pages/dashboard/Dashboard";
import Sales from "./components/pages/sale/Sales";
import Category from "./components/pages/category/Category";
import Users from "./components/pages/Users";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/product" element={<Product />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/category" element={<Category />} />
            <Route path="/users" element={<Users />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
        </Routes>
        <Toaster
          toastOptions={{
            className: "",
            style: {
              fontSize: "13px",
            },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  );
}
