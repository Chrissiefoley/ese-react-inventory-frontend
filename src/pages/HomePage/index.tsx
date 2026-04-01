import React from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import SideMenu from "../../components/SideMenu";
import { useNavigate } from "react-router-dom";
import { InventoryPage } from "../InventoryDashboard/InventoryPage";

interface HomePageProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  isAuthenticated,
  onLogout,
}) => {
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const navigate = useNavigate();

  return (
    <>
      <Box sx={{ display: "flex", width: "100%" }}>
        <Box sx={{ flexShrink: 0 }}>
          <SideMenu
            onSelect={(category) => setSelectedCategory(category)}
          />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            width: 0,
            display: "flex",
            flexDirection: "column",
            bgcolor: "#f5f5f5",
          }}
        >
          <AppBar position="static" elevation={1}>
            <Toolbar>
              <Typography
                variant="h6"
                component="div"
                sx={{ fontWeight: "bold" }}
              >
                Welcome to{" "}
                <span style={{ color: "#373db8ff" }}>SkySupperToSeat</span>
              </Typography>
            </Toolbar>
          </AppBar>
          {isAuthenticated ? (
            <InventoryPage selectedCategory={selectedCategory} />
          ) : (
            <Box sx={{ padding: "40px", textAlign: "center" }}>
              <Typography variant="h5" sx={{ mb: 3 }}>
                You must login to view this page
              </Typography>
              <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                <Button
                  variant="contained"
                  onClick={() => navigate("/login")}
                  sx={{ px: 4 }}
                >
                  Log In
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/register")}
                  sx={{ px: 4 }}
                >
                  Register
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};
