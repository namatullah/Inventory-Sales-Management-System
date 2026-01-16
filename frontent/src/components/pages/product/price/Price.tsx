import { useState } from "react";
import type { ProductType } from "../../../../types";
import { PreviewOutlined } from "@mui/icons-material";
import PriceList from "./PriceList";
import { PriceProvider } from "./contextReducer/PriceContexts";
import LatestPrice from "./LatestPrice";

const Price = ({ product }: { product: ProductType }) => {
  const [pricePreview, setPricePreview] = useState(false);

  return (
    <PriceProvider productId={product._id}>
      {pricePreview && (
        <PriceList
          pricePreview={pricePreview}
          setPricePreview={setPricePreview}
          product={product}
        />
      )}
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <LatestPrice />
        <PreviewOutlined
          color="primary"
          onClick={() => {
            setPricePreview(true);
          }}
        />
      </span>
    </PriceProvider>
  );
};

export default Price;
