import api from "./axios";

export const createSales = (data: any) => api.post("/sales", data);
