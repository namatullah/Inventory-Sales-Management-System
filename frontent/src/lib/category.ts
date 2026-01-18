import type { PaginationType } from "../types";
import api from "./axios";

export const fetchCategories = (pagination: PaginationType) => {
  return api.get("/categories", {
    params: {
      limit: pagination.rowsPerPage,
      page: pagination.page + 1,
    },
  });
};

export const getCategories = () => api.get("/categories/list");
export const createCategory = (name: string) =>
  api.post("/categories", { name });
export const updateCategory = (id: string, name: string) =>
  api.put("/categories/" + id, { name });
export const deleteCategory = (id: string|any) => api.delete("/categories/" + id);
