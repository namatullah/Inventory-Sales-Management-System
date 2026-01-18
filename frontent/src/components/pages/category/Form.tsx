import { CloseOutlined } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { createCategory, updateCategory } from "../../../lib/category";
import toast from "react-hot-toast";
import type { CategoryType } from "../../../helpers/types";
import ApiError from "../../common/ApiError";

const Form = ({
  open,
  onClose,
  category,
}: {
  open: boolean;
  onClose: () => void;
  category: CategoryType | any;
}) => {
  const [apiError, setApiError] = useState<string>("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
  }>({});

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = "Category Name is required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        if (category) {
          const { data } = await updateCategory(category._id, name);
          toast.success(data.message);
        } else {
          const { data } = await createCategory(name);
          toast.success(data.message);
        }
        onClose();
      } catch (error: any) {
        setApiError(
          error.response?.data?.message
            ? error.response?.data?.message
            : "Creating Category faild"
        );
      }
    }
  };
  useEffect(() => {
    if (!category) return;
    setName(category.name);
  }, []);

  return (
    <>
      <Dialog open={open} fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>
                {category ? "Update Category" : "New Category"}
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
              value={name}
              error={!!errors.name}
              helperText={errors.name}
              onChange={({ target }) => setName(target.value)}
            />
            {apiError && <ApiError apiError={apiError} />}
          </DialogContent>

          <DialogActions style={{ padding: "0 25px 20px 20px" }}>
            <Button variant="contained" color="primary" type="submit">
              {category ? "update" : "add"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default Form;
