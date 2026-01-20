import { usePricesContext } from "./contextReducer/PriceContexts";
import type { PriceType } from "../../../../helpers/types";
import { CURRENCY } from "../../../../helpers/helper";

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
  return <span>{latest ? latest?.price + "/. " + CURRENCY : "N/A"} </span>;
};

export default LatestPrice;
