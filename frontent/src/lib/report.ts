import api from "./axios";

export const getUserSalesPerQuantity = () => api.get("/reports/user_sales_per_quantity");
export const getUserSalesPerAmount = () => api.get("/reports/user_sales_per_amount");
