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
  price: string;
  stock: number | string;
  stockUnit: string;
  category?: CategoryType;
}

export interface UserType {
  _id: string;
  name: string;
  email: string;
  role: string;
  password: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface SaleItemType {
  priceAtSale: number;
  quantity: number;
  productId: ProductType | string;
}

export interface SaleType {
  _id: string;
  soldBy: UserType;
  totalAmount: number;
  items: SaleItemType[];
  createdAt: string | Date;
  updatedAt: string | Date;
}
export interface PaginationType {
  page: number;
  rowsPerPage: number;
}

export interface MenuItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  roles: ("admin" | "staff")[];
}
