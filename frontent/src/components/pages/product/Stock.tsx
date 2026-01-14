import { useState } from "react";
import type { ProductType } from "../../../types";
import { Button } from "@mui/material";

const Stock = ({ product }: { product: ProductType }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {product.stock}
      <Button onClick={() => setOpen(true)} sx={{ fontSize: "8px" }}>
        Add in Stock
      </Button>
    </>
  );
};

export default Stock;
