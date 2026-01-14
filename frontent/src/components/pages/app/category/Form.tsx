import { CloseOutlined } from "@mui/icons-material";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { createCategory } from "../../../../lib/category";

const Form = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
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
        await createCategory(name);
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

  return (
    <>
      <Dialog open={open} fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>New Category</Typography>
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
          </DialogContent>
          {apiError && (
            <Grid marginTop={2}>
              <Alert severity="error">{apiError}</Alert>
            </Grid>
          )}
          <DialogActions style={{ padding: "0 25px 20px 20px" }}>
            <Button variant="contained" color="primary" type="submit">
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default Form;
