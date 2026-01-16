import { useState } from "react";
import { AddOutlined } from "@mui/icons-material";
import Form from "./Form";
import { useStockContext } from "./contextReducer/StockContexts";

const Stock = ({ productId }: { productId: string }) => {
  const stock = useStockContext();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {open && <Form open={open} onClose={handleClose} productId={productId} />}
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span>
          {stock.stock !== 0 ? stock.stock + ` (${stock.stockUnit})` : "N/A"}{" "}
        </span>
        <AddOutlined color="primary" onClick={() => setOpen(true)} />
      </span>
    </>
  );
};

export default Stock;
