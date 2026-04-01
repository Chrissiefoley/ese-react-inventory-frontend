import React, { useState } from "react";
import {
  Container,
  Box,
  Alert,
  Button,
  Typography,
  TextField,
  Link,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface RegistrationPageProps {
  onRegister: (registrationData: { [key: string]: string }) => void;
}

export const RegistrationPage = ({ onRegister }: RegistrationPageProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    employee_id: "",
    email: "",
    password: "",
    confirmPassword: "",
    contact_info: "",
  });
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState("");
  const [showRequirements, setShowRequirements] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordRequirements = {
    minLength: formData.password.length >= 8,
    hasUpper: /[A-Z]/.test(formData.password),
    hasLower: /[a-z]/.test(formData.password),
    hasNumber: /\d/.test(formData.password),
  };

  const isPasswordStrong =
    passwordRequirements.minLength &&
    passwordRequirements.hasUpper &&
    passwordRequirements.hasLower &&
    passwordRequirements.hasNumber;

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});
    setSuccess("");
    setShowRequirements(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!isPasswordStrong) {
      setError("Password does not meet strength requirements");
      return;
    }

    try {
      const { confirmPassword, ...registrationData } = formData;
      const dataWithUsername = {
        ...registrationData,
        username: registrationData.employee_id,
      };
      await onRegister(dataWithUsername);
      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => navigate("/"), 2000);
    } catch (error: any) {
      console.error("Registration failed:", error);

      const errorData = error.response?.data;

      const fields = ['employee_id', 'email', 'password', 'contact_info'];
      const foundFieldErrors: { [key: string]: string } = {};

      fields.forEach(field => {
        if (errorData[field]) {
          foundFieldErrors[field] = Array.isArray(errorData[field])
            ? errorData[field][0]
            : errorData[field];
        }
      });

      if (Object.keys(foundFieldErrors).length > 0) {
        setFieldErrors(foundFieldErrors);
        setError("Please fix the errors below");
      } else {
        setError("Registration failed. Please check your information and try again.");
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Register New Staff Member
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Create an account to access the inventory system
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2, width: "100%" }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2, width: "100%" }}>
              {success}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 1, width: "100%" }}
          >
            <TextField
              required
              fullWidth
              label="Employee ID"
              value={formData.employee_id}
              onChange={handleChange("employee_id")}
              margin="normal"
              autoFocus
              error={!!fieldErrors.employee_id}
              helperText={fieldErrors.employee_id || "Your company employee ID (will be used to login)"}
            />
            <TextField
              required
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange("email")}
              margin="normal"
              error={!!fieldErrors.email}
              helperText={fieldErrors.email || "Must match company records for verification"}
            />
            <TextField
              fullWidth
              label="Phone Number (Optional)"
              value={formData.contact_info}
              onChange={handleChange("contact_info")}
              margin="normal"
              placeholder="+1234567890"
              error={!!fieldErrors.contact_info}
              helperText={fieldErrors.contact_info}
            />
            <TextField
              required
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange("password")}
              margin="normal"
              error={!!fieldErrors.password}
              helperText={fieldErrors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {showRequirements && formData.password && !isPasswordStrong && (
              <Box sx={{ bgcolor: "#f5f5f5", borderRadius: 1 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>
                  Password Requirements:
                </Typography>
                <List dense>
                  <ListItem >
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      {passwordRequirements.minLength ? (
                        <CheckCircleIcon color="success" fontSize="small" />
                      ) : (
                        <CancelIcon color="error" fontSize="small" />
                      )}
                    </ListItemIcon>
                    <ListItemText primary="At least 8 characters" />
                  </ListItem>
                  <ListItem >
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      {passwordRequirements.hasUpper ? (
                        <CheckCircleIcon color="success" fontSize="small" />
                      ) : (
                        <CancelIcon color="error" fontSize="small" />
                      )}
                    </ListItemIcon>
                    <ListItemText primary="One uppercase letter (A-Z)" />
                  </ListItem>
                  <ListItem >
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      {passwordRequirements.hasLower ? (
                        <CheckCircleIcon color="success" fontSize="small" />
                      ) : (
                        <CancelIcon color="error" fontSize="small" />
                      )}
                    </ListItemIcon>
                    <ListItemText primary="One lowercase letter (a-z)" />
                  </ListItem>
                  <ListItem >
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      {passwordRequirements.hasNumber ? (
                        <CheckCircleIcon color="success" fontSize="small" />
                      ) : (
                        <CancelIcon color="error" fontSize="small" />
                      )}
                    </ListItemIcon>
                    <ListItemText primary="One number (0-9)" />
                  </ListItem>
                </List>
              </Box>
            )}
            <TextField
              required
              fullWidth
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange("confirmPassword")}
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                backgroundColor: "#1a237e",
                "&:hover": { backgroundColor: "#0d1642" }
              }}
            >
              Register
            </Button>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?
              </Typography>
            </Divider>

            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate("/login")}
              sx={{
                py: 1.5,
                backgroundColor: "#1a237e",
                color: "white",
                "&:hover": { backgroundColor: "#0d1642" }
              }}
            >
              Log In
            </Button>

            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Link
                component="button"
                type="button"
                onClick={() => navigate("/")}
                sx={{ fontSize: "0.9rem" }}
              >
                Back to Home
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};
