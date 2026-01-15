import { createContext, useEffect, useReducer } from "react";
import PriceReducer from "./PriceReducer";
import { fetchPrices } from "../../../../lib/price";

export const PricesContext = createContext<any>(null);
export const PricesDispatchContext = createContext<any>(null);

export const PriceProvider = ({
  productId,
  children,
}: {
  productId: string;
  children: any;
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
