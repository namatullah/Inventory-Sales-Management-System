import { createContext, useContext, useEffect, useReducer } from "react";
import { getStock } from "../../../../../lib/product";
import StockReducer from "./StockReduser";

const StockContext = createContext<any>(null);
const StockDispatchContext = createContext<any>(null);

export const StockProvider = ({
  productId,
  initialStock,
  initialStockUnit,
  children,
}: {
  productId: string;
  initialStock: number | string;
  initialStockUnit: string;
  children: any;
}) => {
  const [stock, dispatch] = useReducer(StockReducer, {
    stock: initialStock,
    stockUnit: initialStockUnit,
  });
  const fetchStock = async () => {
    try {
      const { data } = await getStock(productId);
      dispatch({
        type: "set",
        value: { stock: data.stock, stockUnit: data.stockUnit },
      });
    } catch (error: any) {
      console.error(
        error.response?.data?.message
          ? error.response?.data?.message
          : "Fetching Stock faild"
      );
    }
  };
  useEffect(() => {
    fetchStock();
  }, []);

  return (
    <StockContext value={stock}>
      <StockDispatchContext value={dispatch}>{children}</StockDispatchContext>
    </StockContext>
  );
};

export const useStockContext = () => useContext(StockContext);
export const useStockDispatchContext = () => useContext(StockDispatchContext);
