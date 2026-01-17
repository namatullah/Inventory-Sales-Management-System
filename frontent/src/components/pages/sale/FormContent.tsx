import { Grid, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { getCategories } from "../../../lib/category";
import type { CategoryType } from "../../../types";

const FormContent = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [formData, setFormData] = useState({
    product: "",
    quantity: "",
    price: "",
    item: "",
  });

  const fetchCategories = async () => {
    try {
      const { data } = await getCategories();
      setCategories(data);
    } catch (error: any) {
      console.log(
        error.response?.data?.message
          ? error.response?.data?.message
          : "Fetching categories faild"
      );
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      <Grid size={{ xs: 2, sm: 4, md: 4 }}>
        <TextField
          select
          name="category"
          margin="dense"
          id="outlined-select-currency"
          label="Category"
          variant="outlined"
          value={formData.product}
          fullWidth
          onChange={({ target }) =>
            setFormData({ ...formData, product: target.value })
          }
        >
          {categories.map((category: CategoryType) => (
            <MenuItem key={category._id} value={category._id}>
              {category.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid size={{ xs: 2, sm: 4, md: 4 }}>
        <TextField
          type="text"
          margin="dense"
          name="stock"
          label="Product Quantity"
          variant="outlined"
          fullWidth
          value=""
          helperText="*Please enter only digits"
          onChange={({ target }) => {
            const value = target.value;
            if (/^\d*$/.test(value)) {
            }
          }}
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
          }}
        />
      </Grid>
      <Grid size={{ xs: 2, sm: 4, md: 4 }}>grid1</Grid>
    </Grid>
  );
};

export default FormContent;
