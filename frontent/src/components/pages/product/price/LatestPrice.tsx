import { useContext } from "react";
import { PricesContext } from "./PriceContexts";
import type { PriceType } from "../../../../types";

const LatestPrice = () => {
  const prices = useContext(PricesContext);

  const latest =
    prices?.length > 0
      ? prices.reduce((latest: PriceType, current: PriceType) => {
          return new Date(current.createdAt) > new Date(latest.createdAt)
            ? current
            : latest;
        })
      : null;
  return <span>{latest?.price}</span>;
};

export default LatestPrice;
