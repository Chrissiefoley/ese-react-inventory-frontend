import React, { useState } from "react";
import {
  Container,
  Box,
  Alert,
  Button,
  Typography,
  TextField,
  Link,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export const UserProfile = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Box>
        <Typography variant="h4">Hi, "user"</Typography>
        <Box>
          <Avatar src="https://via.placeholder.com/150"></Avatar>
          <Typography variant="h4">Employee ID: 12345</Typography>
          <Typography variant="h4">Email: user@example.com</Typography>
          <Typography variant="h4">Role: Admin</Typography>
          <Typography variant="h4">Contact Info: 123-456-7890</Typography>
        </Box>
        <Link component="button" onClick={() => navigate(-1)}>
          Go back
        </Link>
      </Box>
    </Container>
  );
};
