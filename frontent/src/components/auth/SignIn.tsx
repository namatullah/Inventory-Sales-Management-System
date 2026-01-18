import { LockOutline, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ApiError from "../common/ApiError";

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const [apiError, setApiError] = useState<string>("");

  // Form data
  const [formData, setFormtData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const handleChange = (e: any) => {
    setFormtData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const switchMode = () => {
    setShowPassword(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      const response = await login(formData);
      if (response.success) {
        navigate("/");
      } else {
        setApiError(response.error ?? "Server Error");
      }
    }
  };

  return (
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
        <Avatar style={{ margin: "10px", backgroundColor: "primary" }}>
          <LockOutline />
        </Avatar>
        <Typography variant="h5" style={{ margin: "4px" }}>
          Sign In
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{ width: "100%", marginTop: "3px" }}
        >
          <TextField
            margin="dense"
            name="email"
            label="Email"
            onChange={handleChange}
            type="email"
            variant="outlined"
            fullWidth
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            margin="dense"
            name="password"
            label="Password"
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            error={!!errors.password}
            helperText={errors.password}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleShowPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: "10px" }}
          >
            Sign In
          </Button>
          {apiError && <ApiError apiError={apiError} />}
          <Grid>
            <Button onClick={() => navigate("/signup")}>
              Don't have an account? Sign Up
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignIn;
