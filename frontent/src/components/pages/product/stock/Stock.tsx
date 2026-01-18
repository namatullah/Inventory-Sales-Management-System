import { useState } from "react";
import { AddOutlined } from "@mui/icons-material";
import Form from "./Form";
import { useStockContext } from "./contextReducer/StockContexts";
import { Button } from "@mui/material";
import { useAuth } from "../../../../context/AuthContext";

const Stock = ({ productId }: { productId: string }) => {
  const stock = useStockContext();
  const [open, setOpen] = useState(false);
  const { isAdmin } = useAuth();

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
        <Button
          size="small"
          disabled={!isAdmin}
          variant="outlined"
          onClick={() => setOpen(true)}
          startIcon={<AddOutlined />}
        >
          <span style={{ paddingTop: "inherit" }}>Add</span>
        </Button>
        <span>
          {stock.stock !== 0 ? stock.stock + ` (${stock.stockUnit})` : "N/A"}{" "}
        </span>
      </span>
    </>
  );
};

export default Stock;
