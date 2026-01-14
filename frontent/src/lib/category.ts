import api from "./axios";

export const fetchCategories = () => api.get("/categories");
export const createCategory = (name: string) =>
  api.post("/categories", { name });
export const updateCategory = (id: string, name: string) =>
  api.put("/categories/" + id, { name });
export const deleteCategory = (id: string) => api.delete("/categories/" + id);
