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

export const RegistrationPage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Box>
        <Typography variant="h4">Register New Staff Member</Typography>
        <Box>
          <TextField label="Name" />
          <TextField label="Email" />
          <TextField label="Password" />
          <TextField label="Confirm Password" />
          <Button variant="contained" onClick={() => navigate("/login")}>
            Register
          </Button>
          <Link component="button" onClick={() => navigate("/login")}>
            Already have an account? Login
          </Link>
          <Link component="button" onClick={() => navigate(-1)}>
            Go back
          </Link>
        </Box>
      </Box>
    </Container>
  );
};
