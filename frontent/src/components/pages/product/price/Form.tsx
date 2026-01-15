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
import { createPrice } from "../../../../lib/price";
import { usePricesDispatchContext } from "./contextReducer/PriceContexts";

const Form = ({
  open,
  onClose,
  productId,
}: {
  open: boolean;
  onClose: () => void;
  productId: string;
}) => {
  const dispatch = usePricesDispatchContext();
  const [apiError, setApiError] = useState<string>("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(true);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await createPrice({ productId, price });
      toast.success(data.message);
      dispatch({ type: "create", value: data.data });
      onClose();
    } catch (error: any) {
      setApiError(
        error.response?.data?.message
          ? error.response?.data?.message
          : "Creating price faild"
      );
    }
  };
  return (
    <>
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
              name="price"
              label="Price"
              variant="outlined"
              fullWidth
              value={price}
              helperText="*Please enter only digits"
              onChange={({ target }) => {
                const value = target.value;
                if (/^\d*$/.test(value)) {
                  setPrice(value);
                  setLoading(value === "");
                }
              }}
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
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
              Add new Price
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default Form;
