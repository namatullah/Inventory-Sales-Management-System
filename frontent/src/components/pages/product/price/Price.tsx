import { useState } from "react";
import type { ProductType } from "../../../../types";
import { PreviewOutlined } from "@mui/icons-material";
import PriceList from "./PriceList";

const Price = ({ product }: { product: ProductType | any }) => {
  const [pricePreview, setPricePreview] = useState(false);
  return (
    <>
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
        <PreviewOutlined
          color="primary"
          onClick={() => {
            setPricePreview(true);
          }}
        />
        <span>303 Af</span>
      </span>
    </>
  );
};

export default Price;
