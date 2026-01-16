import { LockOutline, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { signup } from "../../lib/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SignUp = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [forgotPassword, setForgotPassword] = useState(false);

  // Form data
  const [formData, setFormtData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    adminInviteToken: "",
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const handleChange = (e: any) => {
    setFormtData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const switchMode = () => {
    setShowPassword(false);
  };

  const [submitError, setSubmitError] = useState<string | null | undefined>(
    null
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!formData.name.trim()) newErrors.name = "Full Name is required";

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

    // Confirm Password
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      const { confirmPassword, ...safeData } = formData;
      const response = register(safeData);
      if (response.success) {
        navigate("/");
      } else {
        console.log(response.error);
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
          Sign Up
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{ width: "100%", marginTop: "3px" }}
        >
          <TextField
            margin="dense"
            name="name"
            label="Full Name"
            onChange={handleChange}
            autoFocus
            type="Text"
            variant="outlined"
            fullWidth
            error={Boolean(errors.name)}
            helperText={errors.name}
          />
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

          <TextField
            margin="dense"
            name="confirmPassword"
            label="Confirm Password"
            onChange={handleChange}
            type="password"
            variant="outlined"
            fullWidth
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
          <TextField
            margin="dense"
            name="adminInviteToken"
            label="Admin Invite Token"
            onChange={handleChange}
            autoFocus
            type="Text"
            variant="outlined"
            fullWidth
            helperText="* For the real Admin the token is given while lounching this App"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: "10px" }}
          >
            Sign Up
          </Button>
          {submitError ? (
            <>
              <Grid marginTop={2}>
                <Alert severity="error">{submitError}</Alert>
              </Grid>

              {forgotPassword && <Link>Forgot your password?</Link>}
            </>
          ) : (
            <Grid>
              <Button onClick={() => navigate("/signin")}>
                Already have an account? Sign In
              </Button>
            </Grid>
          )}
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;
