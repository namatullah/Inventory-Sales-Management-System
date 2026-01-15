import api from "./axios";

export const createPrice = (data: any) => api.post("/prices", data);
export const fetchPrices = (productId: string) =>
  api.get("/prices", {
    params: {
      productId,
    },
  });

// export const updateProduct = (id: string, data: ProductType | any) =>
//   api.put("/products/" + id, data);
// export const deleteProduct = (id: string) => api.delete("/products/" + id);
