export interface CategoryType {
  _id: string;
  name: string;
}



export interface ProductType {
  _id: string;
  name: string;
  sku: string;
  category?: CategoryType;
}
