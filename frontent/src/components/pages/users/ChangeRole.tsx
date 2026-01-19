import { CloseOutlined } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import type { UserType } from "../../../helpers/types";
import { useState } from "react";
import ApiError from "../../common/ApiError";
import { USER_ROLE } from "../../../helpers/helper";
import toast from "react-hot-toast";
import { changeRole } from "../../../lib/users";
const ChangeRole = ({
  open,
  onClose,
  user,
}: {
  open: boolean;
  onClose: () => void;
  user: UserType;
}) => {
  const [role, setRole] = useState(user.role);
  const [apiError, setApiError] = useState<string>("");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await changeRole(user._id, { role });
      toast.success(data.message);
      onClose();
    } catch (error: any) {
      setApiError(
        error.response?.data?.message
          ? error.response?.data?.message
          : "Changing user role faild"
      );
    }
  };
  return (
    <Dialog open={open} maxWidth="xs" fullWidth>
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
          <FormControl variant="outlined" size="small">
            <FormLabel id="demo-error-radios">User Role</FormLabel>
            <RadioGroup
              row
              name="role"
              value={role}
              onChange={({ target }) => setRole(target.value)}
            >
              <FormControlLabel
                value={USER_ROLE.ADMIN}
                control={<Radio />}
                label="Admin"
                style={{ margin: 0 }}
              />
              <FormControlLabel
                value={USER_ROLE.STAFF}
                control={<Radio />}
                label="Staff"
                style={{ margin: 0 }}
              />
            </RadioGroup>
          </FormControl>
          {apiError && <ApiError apiError={apiError} />}
        </DialogContent>

        <DialogActions style={{ padding: "0 25px 20px 20px" }}>
          <Button variant="contained" color="primary" type="submit">
            Change Role
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ChangeRole;
