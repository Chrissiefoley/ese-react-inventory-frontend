//link to send email password reset.
import {
  Container,
  Box,
  Button,
  Typography,
  TextField,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export const PasswordResetPage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Box>
        <Typography variant="h4">Forgotten password?</Typography>
              <Box>
                  //If success show alert, if error show error alert
          <TextField label="Enter your email" />
          <Button variant="contained" onClick={() => navigate("/login")}>
            Send password reset
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
