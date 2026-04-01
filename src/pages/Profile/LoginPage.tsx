import {
  Container,
  Box,
  Button,
  Typography,
  TextField,
  Paper,
  Alert,
  Divider,
  Link,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { LoginCredentials } from "../../types";

interface LoginPageProps {
  onLogin: (credentials: LoginCredentials) => Promise<void>;
}

export const LoginPage = ({ onLogin }: LoginPageProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [sessionExpired, setSessionExpired] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (searchParams.get("message") === "session_expired") {
      setSessionExpired(true);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await onLogin({ username: employeeId, password });
      const redirect = searchParams.get("redirect");
      navigate(redirect ? `/${redirect}` : "/");
    } catch (error) {
      console.error("Login failed", error);
      setError("Invalid employee ID or password. Please try again.");
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
            Staff Login
          </Typography>

          {sessionExpired && (
            <Alert severity="warning" sx={{ mb: 2, width: "100%" }}>
              Your session has expired due to inactivity. Please log in again.
            </Alert>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 2, width: "100%" }}>
              {error}
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
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              margin="normal"
              autoFocus
            />
            <TextField
              required
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
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
              Login
            </Button>

            <Divider sx={{ my: 2 }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mb: 2
              }}
            >
              <Link
                component="button"
                type="button"
                onClick={() => navigate("/")}
                sx={{ fontSize: "0.9rem" }}
              >
                Back to Home
              </Link>
            </Box>

            <Divider sx={{ my: 2 }}>
              <Typography variant="body2" color="text.secondary">
                New User?
              </Typography>
            </Divider>

            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate("/register")}
              sx={{
                mt: 1,
                backgroundColor: "#1a237e",
                color: "white",
                "&:hover": { backgroundColor: "#0d1642" }
              }}
            >
              Create New Account
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};
