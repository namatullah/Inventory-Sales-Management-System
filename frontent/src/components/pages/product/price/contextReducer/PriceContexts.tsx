import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";
import PriceReducer from "./PriceReducer";
import { fetchPrices } from "../../../../../lib/price";
import type { PriceType } from "../../../../../helpers/types";

const PricesContext = createContext<PriceType[]>([]);
const PricesDispatchContext = createContext<any>(null);

export const PriceProvider = ({
  productId,
  children,
}: {
  productId: string;
  children: ReactNode;
}) => {
  const [prices, dispatch] = useReducer(PriceReducer, []);
  const getPrices = async () => {
    try {
      const { data } = await fetchPrices(productId);
      dispatch({ type: "set", value: data });
    } catch (error: any) {
      console.error(
        error.response?.data?.message
          ? error.response?.data?.message
          : "Fetching prices faild"
      );
    }
  };
  useEffect(() => {
    getPrices();
  }, []);

  return (
    <PricesContext value={prices}>
      <PricesDispatchContext value={dispatch}>{children}</PricesDispatchContext>
    </PricesContext>
  );
};

export const usePricesContext = () => useContext(PricesContext);
export const usePricesDispatchContext = () => useContext(PricesDispatchContext);
