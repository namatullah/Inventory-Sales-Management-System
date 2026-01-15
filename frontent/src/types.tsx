export interface CategoryType {
  _id: string;
  name: string;
}

export interface PriceType {
  _id: string;
  price: number | string;
  createdAt: string | Date;
  updatedAt: string | Date;
  product: string;
}

export interface ProductType {
  _id: string;
  name: string;
  sku: string;
  category?: CategoryType;
}
