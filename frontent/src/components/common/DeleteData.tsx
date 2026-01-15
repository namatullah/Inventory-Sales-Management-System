import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { useState } from "react";
import ApiError from "./ApiError";
import toast from "react-hot-toast";

const DeleteData = ({
  open,
  onClose,
  id,
  message,
  deleteFunction,
}: {
  open: boolean;
  onClose: () => void;
  id: string | any;
  message: any;
  deleteFunction: (id: string) => void;
}) => {
  const [apiError, setApiError] = useState<string>("");
  const handleDelete = async () => {
    try {
      const { data } = await deleteFunction(id);
      toast.success(data?.message);
      onClose();
    } catch (error: any) {
      setApiError(
        error.response?.data?.message
          ? error.response?.data?.message
          : "Deletion failed"
      );
    }
  };
  return (
    <Dialog maxWidth="sm" open={open} onClose={onClose}>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
        {apiError && <ApiError apiError={apiError} />}
      </DialogContent>

      <DialogActions style={{ padding: "0 25px 20px 20px" }}>
        <Button variant="contained" color="error" onClick={handleDelete}>
          yes
        </Button>
        <Button variant="contained" onClick={onClose}>
          no
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteData;
