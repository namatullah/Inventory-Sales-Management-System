import api from "./axios";

export const createPrice = (data: any) => api.post("/prices", data);
export const fetchPrices = (productId: string) =>
  api.get("/prices", {
    params: {
      productId,
    },
  });
export const deletePrice = (id: string) => api.delete("/prices/" + id);
