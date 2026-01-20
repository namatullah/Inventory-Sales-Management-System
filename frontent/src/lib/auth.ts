import type { UserType } from "../helpers/types";
import api from "./axios";

export const signup = (data: UserType) => api.post("/auth/signup", data);
export const signin = (data: UserType) => api.post("/auth/signin", data);
export const me = () => api.get("/auth/me");
export const updateUser = (
  id: string | any,
  data: { name: string; email: string }
) => api.put("/auth/" + id + "/update_profile", data);

export const changePassword = (id: string | any, data: { password: string }) =>
  api.put("/auth/" + id + "/change_password", data);
export const verifiyingEmail = (email: string) =>
  api.get("/auth/verifiying_email", {
    params: {
      email,
    },
  });
