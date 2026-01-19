import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import type { UserType } from "../../../helpers/types";
import { CloseOutlined } from "@mui/icons-material";
import { useState } from "react";
import Edit from "./Edit";
import ChangePassword from "./ChangePassword";

const Profile = ({
  open,
  setOpenProfile,
  user,
}: {
  open: boolean;
  setOpenProfile: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserType | null;
}) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  return (
    <>
      {openEdit && (
        <Edit open={openEdit} setOpenEdit={setOpenEdit} user={user} />
      )}
      {openChangePassword && (
        <ChangePassword
          open={openChangePassword}
          setOpenChangePassword={setOpenChangePassword}
          user={user}
        />
      )}
      <Dialog open={open} maxWidth="xs" fullWidth>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography>User Profile</Typography>
          <CloseOutlined onClick={() => setOpenProfile(false)} color="error" />
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Box>
            <ListItem>
              <ListItemText
                primary="Full Name:"
                secondary={user?.name}
                primaryTypographyProps={{
                  sx: { alignContent: "center" },
                }}
                secondaryTypographyProps={{
                  sx: { alignContent: "center" },
                }}
                sx={{ display: "flex", gap: 2 }}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Email:"
                secondary={user?.email}
                primaryTypographyProps={{
                  sx: { alignContent: "center" },
                }}
                secondaryTypographyProps={{
                  sx: { alignContent: "center" },
                }}
                sx={{ display: "flex", gap: 2 }}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Role:"
                secondary={user?.role}
                primaryTypographyProps={{
                  sx: { alignContent: "center" },
                }}
                secondaryTypographyProps={{
                  sx: { alignContent: "center" },
                }}
                sx={{ display: "flex", gap: 2 }}
              />
            </ListItem>
          </Box>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ padding: "20px 30px 20px 3px" }}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => setOpenChangePassword(true)}
          >
            Change Password
          </Button>
          <Button
            size="small"
            variant="outlined"
            onClick={() => setOpenEdit(true)}
          >
            edit profile
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Profile;
