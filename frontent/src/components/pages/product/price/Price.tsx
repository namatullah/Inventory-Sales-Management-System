import { useState } from "react";
import type { ProductType } from "../../../../helpers/types";
import { PreviewOutlined } from "@mui/icons-material";
import PriceList from "./PriceList";
import { PriceProvider } from "./contextReducer/PriceContexts";
import LatestPrice from "./LatestPrice";
import { Button } from "@mui/material";
import { useAuth } from "../../../../context/AuthContext";

const Price = ({ product }: { product: ProductType }) => {
  const [pricePreview, setPricePreview] = useState(false);
  const { isAdmin } = useAuth();
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
        <Button
          size="small"
          disabled={!isAdmin}
          variant="outlined"
          onClick={() => {
            setPricePreview(true);
          }}
          startIcon={<PreviewOutlined />}
        >
          <span style={{ paddingTop: "inherit" }}>View</span>
        </Button>
        <LatestPrice />
      </span>
    </PriceProvider>
  );
};

export default Price;
