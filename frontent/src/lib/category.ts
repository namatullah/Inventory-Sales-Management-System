import api from "./axios";

export const createCategory = (name: string) =>
  api.post("/categories", { name });
export const Category = (id: string, name: string) =>
  api.put("/categories/" + id, { name });
export const deleteCategory = (id: string) => api.delete("/categories/" + id);
