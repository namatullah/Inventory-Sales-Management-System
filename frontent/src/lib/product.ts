import type { ProductType } from "../types";
import api from "./axios";

export const fetchProducts = (pagination: any) => {
  return api.get("/products", {
    params: {
      limit: pagination.rowsPerPage,
      page: pagination.page + 1,
    },
  });
};

export const createProduct = (data: ProductType | any) =>
  api.post("/products", data);
export const updateProduct = (id: string, data: ProductType | any) =>
  api.put("/products/" + id, data);
export const deleteProduct = (id: string) => api.delete("/products/" + id);
