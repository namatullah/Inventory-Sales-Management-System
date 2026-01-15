import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

const DeleteData = ({
  open,
  onClose,
  message,
  deleteFunction,
}: {
  open: boolean;
  onClose: () => void;
  message: any;
  deleteFunction: () => void;
}) => {
  const handleDelete = () => {
    deleteFunction();
    onClose();
  };
  return (
    <Dialog maxWidth="sm" open={open} onClose={onClose}>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
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
