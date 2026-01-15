import { Category, CloseOutlined } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import type { CategoryType, ProductType } from "../../../types";
import ApiError from "../../common/ApiError";
import { createProduct, updateProduct } from "../../../lib/product";
import { getCategories } from "../../../lib/category";

const Form = ({
  open,
  onClose,
  product,
}: {
  open: boolean;
  onClose: () => void;
  product: ProductType | any;
}) => {
  const [apiError, setApiError] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "",
    price: "",
    stock: "",
  });
  const [errors, setErrors] = useState<{
    name?: string;
    sku?: string;
    category?: string;
    price?: string;
    stock?: string;
  }>({});

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const newErrors: typeof errors = {};
    if (!formData.name.trim()) newErrors.name = "Product Name is required";
    if (!formData.sku.trim()) newErrors.sku = "Product SKU is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.price) newErrors.price = "Product Price is required";
    if (!formData.stock) newErrors.stock = "Quantity in stock required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        if (product) {
          const { data } = await updateProduct(product._id, formData);
          toast.success(data.message);
        } else {
          const { data } = await createProduct(formData);
          toast.success(data.message);
        }
        onClose();
      } catch (error: any) {
        setApiError(
          error.response?.data?.message
            ? error.response?.data?.message
            : "Creating Product faild"
        );
      }
    }
  };
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const fetchCategories = async () => {
    try {
      const { data } = await getCategories();
      setCategories(data);
    } catch (error: any) {
      setApiError(
        error.response?.data?.message
          ? error.response?.data?.message
          : "Fetching categories faild"
      );
    }
  };
  useEffect(() => {
    fetchCategories();
    if (!product) return;
    setFormData({
      ...formData,
      name: product.name,
      sku: product.sku,
      category: product.category._id,
      price: product.price,
      stock: product.stock,
    });
  }, []);

  return (
    <>
      <Dialog open={open} fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>
                {product ? "Update Product" : "New Product"}
              </Typography>
              <CloseOutlined onClick={onClose} color="error" />
            </div>
          </DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              name="name"
              label="Name"
              variant="outlined"
              fullWidth
              value={formData.name}
              error={!!errors.name}
              helperText={errors.name}
              onChange={({ target }) =>
                setFormData({ ...formData, name: target.value })
              }
            />
            <TextField
              margin="dense"
              name="sku"
              label="SKU"
              variant="outlined"
              fullWidth
              value={formData.sku}
              error={!!errors.sku}
              helperText={errors.sku}
              onChange={({ target }) =>
                setFormData({ ...formData, sku: target.value })
              }
            />
            <TextField
              select
              name="category"
              margin="dense"
              id="outlined-select-currency"
              label="Category"
              variant="outlined"
              value={formData.category}
              fullWidth
              error={!!errors.category}
              helperText={errors.category}
              onChange={({ target }) =>
                setFormData({ ...formData, category: target.value })
              }
            >
              {categories.map((category: CategoryType) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              type="text"
              margin="dense"
              name="price"
              label="Price"
              variant="outlined"
              fullWidth
              value={formData.price}
              error={!!errors.price}
              helperText={errors.price}
              onChange={({ target }) => {
                const value = target.value;
                if (/^\d*$/.test(value)) {
                  setFormData({ ...formData, price: value });
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
              name="stock"
              label="stock"
              variant="outlined"
              fullWidth
              value={formData.stock}
              error={!!errors.stock}
              helperText={errors.stock}
              onChange={({ target }) => {
                const value = target.value;
                if (/^\d*$/.test(value)) {
                  setFormData({ ...formData, stock: value });
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
            <Button variant="contained" color="primary" type="submit">
              {product ? "update product" : "add product"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default Form;
