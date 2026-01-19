import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { CloseOutlined } from "@mui/icons-material";
import ApiError from "../../common/ApiError";
import type { UserType } from "../../../helpers/types";
import toast from "react-hot-toast";
import { updateUser } from "../../../lib/auth";
import { useAuth } from "../../../context/AuthContext";

const Edit = ({
  open,
  setOpenEdit,
  user,
}: {
  open: boolean;
  setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserType | null;
}) => {
  const { setUserProfile } = useAuth();
  const [apiError, setApiError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState<string | any>(user?.name);
  const [email, setEmail] = useState<string | any>(user?.email);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await updateUser(user?._id, { name, email });
      await setUserProfile(data.user);
      toast.success(data.message);
      setOpenEdit(false);
    } catch (error: any) {
      setApiError(
        error.response?.data?.message
          ? error.response?.data?.message
          : "User profile changes failed"
      );
    }
  };

  return (
    <Dialog open={open} maxWidth="xs" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>Update User Profile</Typography>
            <CloseOutlined onClick={() => setOpenEdit(false)} color="error" />
          </div>
        </DialogTitle>

        <Divider />
        <DialogContent>
          <TextField
            type="text"
            margin="dense"
            name="name"
            label="Full Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={({ target }) => {
              const value = target.value;
              setName(value);
              setLoading(value === "");
            }}
          />
          <TextField
            type="text"
            margin="dense"
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={({ target }) => {
              const value = target.value;
              setEmail(value);
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
            update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default Edit;
