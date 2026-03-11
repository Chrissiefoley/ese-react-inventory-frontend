import { Container, Box, Button, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const LogoutPage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Box>
        <Typography variant="h4">You are now logged out</Typography>
        <Box>
          <Button variant="contained" onClick={() => navigate("/login")}>
            Take me to login
          </Button>
          <Link component="button" onClick={() => navigate(-1)}>
            Go back
          </Link>
        </Box>
      </Box>
    </Container>
  );
};
