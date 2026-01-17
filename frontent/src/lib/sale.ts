import api from "./axios";

export const getSales = (pagination: any) =>
  api.get("/sales", {
    params: {
      limit: pagination.rowsPerPage,
      page: pagination.page + 1,
    },
  });
export const createSales = (data: any) => api.post("/sales", data);
