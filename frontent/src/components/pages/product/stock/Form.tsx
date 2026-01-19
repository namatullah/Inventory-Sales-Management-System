import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
} from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import ApiError from "../../../common/ApiError";
import { CloseOutlined } from "@mui/icons-material";
import { addToStock } from "../../../../lib/product";
import {
  useStockContext,
  useStockDispatchContext,
} from "./contextReducer/StockContexts";

const Form = ({
  open,
  onClose,
  productId,
}: {
  open: boolean;
  onClose: () => void;
  productId: string;
}) => {
  const dispatch = useStockDispatchContext();
  const value = useStockContext();
  const [apiError, setApiError] = useState<string>("");
  const [stock, setStock] = useState("");
  const [stockUnit, setStockUnit] = useState(value.stockUnit);
  const [loading, setLoading] = useState(true);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await addToStock(productId, { stock, stockUnit });
      dispatch({
        type: "set",
        value: { stock: data.data.stock, stockUnit: data.data.stockUnit },
      });
      toast.success(data.message);
      onClose();
    } catch (error: any) {
      setApiError(
        error.response?.data?.message
          ? error.response?.data?.message
          : "Adding to stock faild"
      );
    }
  };
  return (
    <Dialog open={open} maxWidth="xs">
      <form onSubmit={handleSubmit}>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            px: 1.8,
            pb: 1.5,
          }}
        >
          <CloseOutlined onClick={onClose} color="error" />
        </DialogTitle>
        <Divider />
        <DialogContent>
          <TextField
            type="text"
            margin="dense"
            name="stock"
            label="Product Quantity"
            variant="outlined"
            fullWidth
            value={stock}
            helperText="*Please enter only digits"
            onChange={({ target }) => {
              const value = target.value;
              if (/^\d*$/.test(value)) {
                setStock(value);
                setLoading(value === "");
              }
            }}
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*",
            }}
          />
          <TextField
            type="text"
            margin="dense"
            name="stockUnit"
            label="Product Unit"
            variant="outlined"
            fullWidth
            value={stockUnit}
            helperText="*example: Piece, Unit, Pair, Item, Dozen, Box, Pack, Bag, Carton, Pair, Kilogram, Liter, Meter"
            onChange={({ target }) => {
              const value = target.value;
              setStockUnit(value);
              setLoading(value === "");
            }}
          />
          {apiError && <ApiError apiError={apiError} />}
        </DialogContent>

        <DialogActions style={{ padding: "0 25px 20px 20px" }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
          >
            Add Product Quantity to stock
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default Form;
