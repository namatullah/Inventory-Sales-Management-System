import api from "./axios";

export const getUserQuantitySale = () => api.get("/reports");
