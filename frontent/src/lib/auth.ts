import type { UserType } from "../helpers/types";
import api from "./axios";

export const signup = (data: UserType) => api.post("/auth/signup", data);
export const signin = (data: UserType) => api.post("/auth/signin", data);
export const me = (token: string | any) =>
  api.get("/auth/me", {
    params: {
      token,
    },
  });
export const updateUser = (
  id: string | any,
  data: { name: string; email: string }
) => api.put("/auth/" + id, data);
