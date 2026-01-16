import api from "./axios";

export const signup = (data: any) => api.post("/auth/signup", data);
export const signin = (data: any) => api.post("/auth/signin", data);
export const me = (token: string | any) =>
  api.get("/auth/me", {
    params: {
      token,
    },
  });
