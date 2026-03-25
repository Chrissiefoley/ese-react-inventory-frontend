import {
  Container,
  Box,
  Button,
  Typography,
  TextField,
  Link,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginPageProps {
  onLogin: (credentials: { [key: string]: string }) => void;
}

export const LoginPage = ({ onLogin }: LoginPageProps) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      await onLogin({ username: email, password });
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <Container>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Staff Login</Typography>
        <Box sx={{ mt: 1 }}>
          <TextField
            required
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />
          <TextField
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />
          <TextField
            required
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            margin="normal"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Login
          </Button>
          <Link
            component="button"
            type="button"
            onClick={() => navigate("/reset_password")}
          >
            Forgotten Password?
          </Link>
          <Link component="button" type="button" onClick={() => navigate(-1)}>
            Go back
          </Link>
        </Box>
      </Box>
    </Container>
  );
};
