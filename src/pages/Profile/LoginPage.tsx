import React, { useState } from "react";
import {
  Container,
  Box,
  Alert,
  Button,
  Typography,
  TextField,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Box>
        <Typography variant="h4">Staff Login</Typography>
        <Box>
          <TextField label="Name" />
          <TextField label="Email" />
          <TextField label="Password" />
          <TextField label="Confirm Password" />
          <Button variant="contained" onClick={() => navigate("/login")}>
            Login
          </Button>
          <Link component="button" onClick={() => navigate("/reset_password")}>
            Forgotten Password?
          </Link>
          <Link component="button" onClick={() => navigate(-1)}>
            Go back
          </Link>
        </Box>
      </Box>
    </Container>
  );
};
