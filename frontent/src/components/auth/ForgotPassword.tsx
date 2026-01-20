import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifiyingEmail } from "../../lib/auth";
import ApiError from "../common/ApiError";
import ChangePassword from "../pages/profile/ChangePassword";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('')
  const [errors, setErrors] = useState<{
    email?: string;
  }>({});
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Email is invalid";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        const { data } = await verifiyingEmail(email);
        setId(data.id)
        setOpen(true)
      } catch (error: any) {
        setApiError(
          error.response?.data?.message
            ? error.response?.data?.message
            : "User profile changes failed"
        );
      }
    }
  };
  return (
    <>
    {open && (
        <ChangePassword
          open={open}
          setOpenChangePassword={setOpen}
          id={id}
        />
      )}
      <Container component="main" style={{ maxWidth: "600px" }}>
        <Paper
          elevation={6}
          sx={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
            margin: "40px",
          }}
        >
          <Typography variant="h5" style={{ margin: "4px" }}>
            Forgot Password
          </Typography>
          <form
            onSubmit={handleSubmit}
            style={{ width: "100%", marginTop: "3px" }}
          >
            <TextField
              margin="dense"
              name="email"
              label="Your Email"
              type="text"
              variant="outlined"
              fullWidth
              error={!!errors.email}
              helperText={errors.email}
              onChange={({ target }) => {
                const value = target.value;
                setEmail(value);
                setLoading(value === "");
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: "10px" }}
              disabled={loading}
            >
              Sign In
            </Button>
            {apiError && <ApiError apiError={apiError} />}
            <Typography
              variant="body2"
              sx={{
                my: 2,
                textAlign: "right",
                cursor: "pointer",
                color: "primary.main",
                fontSize: "0.75rem",
                textDecoration: "underline",
                "&:hover": {
                  color: "primary.dark",
                },
              }}
              onClick={() => navigate("/signin")}
            >
              Sign In
            </Typography>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default ForgotPassword;
