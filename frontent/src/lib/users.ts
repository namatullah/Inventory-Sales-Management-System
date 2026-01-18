import type { PaginationType } from "../types";
import api from "./axios";

export const fetchUsers = (pagination: PaginationType) => {
  return api.get("/users", {
    params: {
      limit: pagination.rowsPerPage,
      page: pagination.page + 1,
    },
  });
};
export const deleteUser = (id: string) => api.delete("/users/" + id);
