import { Container, Box, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

export const LogoutPage = () => {
  const navigate = useNavigate();

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
            You've Been Logged Out
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 3, textAlign: "center" }}
          >Your session has ended securely. Please log back in to access Inventory.
          </Typography>

          <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => navigate("/login")}
              sx={{ py: 1.5 }}
            >
              Login Again
            </Button>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => navigate("/")}
              sx={{ py: 1.5 }}
            >
              Go Home
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};
