import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import type { UserType } from "../../../helpers/types";
import { CloseOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import ApiError from "../../common/ApiError";
import { changePassword } from "../../../lib/auth";
import { useAuth } from "../../../context/AuthContext";
import toast from "react-hot-toast";

const ChangePassword = ({
  open,
  setOpenChangePassword,
  user,
}: {
  open: boolean;
  setOpenChangePassword: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserType | null;
}) => {
  const { logout } = useAuth();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await changePassword(user?._id, { password });
      toast.success(data.message);
      logout();
      setOpenChangePassword(false);
    } catch (error: any) {
      setApiError(
        error.response?.data?.message
          ? error.response?.data?.message
          : "Password change failed"
      );
    }
  };

  return (
    <Dialog open={open} maxWidth="xs" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>Change Password</Typography>
            <CloseOutlined
              onClick={() => setOpenChangePassword(false)}
              color="error"
            />
          </div>
        </DialogTitle>

        <Divider />
        <DialogContent>
          <TextField
            margin="dense"
            name="password"
            label="New Password"
            onChange={({ target }) => {
              const value = target.value;
              setPassword(value);
              setLoading(value === "");
            }}
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextField
            margin="dense"
            name="confirmPassword"
            label="Confirm New Password"
            onChange={({ target }) => {
              const value = target.value;
              setConfirmPassword(value);
              setLoading(value === "");
            }}
            type="password"
            variant="outlined"
            fullWidth
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
            Change
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ChangePassword;
