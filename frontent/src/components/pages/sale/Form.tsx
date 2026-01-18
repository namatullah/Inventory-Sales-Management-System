import { AddOutlined, CloseOutlined } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getProducts } from "../../../lib/product";
import type { ProductType } from "../../../types";
import { useAuth } from "../../../context/AuthContext";
import { createSales } from "../../../lib/sale";
import ApiError from "../../common/ApiError";

const Form = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const { user } = useAuth();
  const [apiError, setApiError] = useState<string>("");
  const [prods, setProds] = useState<ProductType[]>([]);
  const fetchProducts = async () => {
    try {
      const { data } = await getProducts();
      setProds(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const [rows, setRows] = useState<any>([
    { productId: "", price: 0, quantity: 1, total: 0 },
  ]);
  // add new row
  const addRow = () => {
    setRows([...rows, { productId: "", price: 0, quantity: 1, total: 0 }]);
  };
  const handleChange = (index: number, field: string, value: any) => {
    const updated = [...rows];
    updated[index][field] = value;

    const price = Number(updated[index].price);
    const quantity = Number(updated[index].quantity);

    updated[index].total = price * quantity;

    setRows(updated);
  };
  // remove row
  const removeRow = (index: any) => {
    const updated = [...rows];
    updated.splice(index, 1);
    setRows(updated);
  };

  const grandTotal = rows.reduce((sum: number, row: any) => sum + row.total, 0);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await createSales({ userId: user._id, rows });
      onClose();
    } catch (error: any) {
      setApiError(
        error.response?.data?.message
          ? error.response?.data?.message
          : "Fetching categories faild"
      );
    }
  };

  return (
    <Dialog maxWidth="md" open={open} fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography>Adding Sales</Typography>
          <CloseOutlined onClick={onClose} color="error" />
        </DialogTitle>
        <Divider />
        <DialogContent>
          {apiError && <ApiError apiError={apiError} />}
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Total Price</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell width="30%">
                      <TextField
                        select
                        name="product"
                        label="Select a Product"
                        variant="outlined"
                        size="small"
                        value={row.productId}
                        fullWidth
                        onChange={(e) => {
                          const product: any = prods.find(
                            (p) => p._id === e.target.value
                          );
                          handleChange(index, "productId", e.target.value);
                          handleChange(index, "price", product?.price || 0);
                        }}
                      >
                        {prods.map((product: ProductType) => (
                          <MenuItem key={product._id} value={product._id}>
                            {product.name} (${product.price})
                          </MenuItem>
                        ))}
                      </TextField>
                    </TableCell>
                    {/* QUANTITY */}
                    <TableCell>
                      <TextField
                        type="text"
                        name="quantity"
                        label="Quantity"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={row.quantity}
                        onChange={(e) =>
                          handleChange(index, "quantity", e.target.value)
                        }
                        inputProps={{
                          inputMode: "numeric",
                          pattern: "[0-9]*",
                        }}
                      />
                    </TableCell>

                    {/* TOTAL */}
                    <TableCell>
                      <TextField
                        type="text"
                        name="stock"
                        label="Price"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={row.total.toFixed(2)}
                        disabled
                      />
                    </TableCell>
                    {/* DELETE */}
                    <TableCell>
                      {index !== 0 && (
                        <CloseOutlined
                          onClick={() => removeRow(index)}
                          color="error"
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={2}>
                    <AddOutlined onClick={addRow} color="primary" />
                  </TableCell>
                  <TableCell sx={{ fontSize: "16px" }}>
                    Grand Total: {grandTotal.toFixed(2)} Af
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions style={{ padding: "0 25px 20px 20px" }}>
          <Button variant="contained" color="primary" type="submit">
            Done Shopping
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default Form;
