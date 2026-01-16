import { usePricesContext } from "./contextReducer/PriceContexts";
import type { PriceType } from "../../../../types";

const LatestPrice = () => {
  const prices = usePricesContext();

  const latest =
    prices?.length > 0
      ? prices.reduce((latest: PriceType, current: PriceType) => {
          return new Date(current.createdAt) > new Date(latest.createdAt)
            ? current
            : latest;
        })
      : null;
  return <span>{latest ? latest?.price + "/. (Af)" : "N/A"} </span>;
};

export default LatestPrice;
