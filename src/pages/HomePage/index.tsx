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
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            backgroundColor: "#f5f5f5",
          }}
        >
          <AppBar
            position="static"
            sx={{
              backgroundColor: "#1a237e",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <Toolbar>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, fontWeight: 600 }}
              >
                ESE Inventory Management
              </Typography>
              {isAuthenticated ? (
                <>
                  <Button
                    color="inherit"
                    onClick={() => navigate("/profile")}
                    sx={{ mr: 2 }}
                  >
                    Profile
                  </Button>
                  <Button color="inherit" onClick={onLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <Button color="inherit" onClick={() => navigate("/login")}>
                  Login
                </Button>
              )}
            </Toolbar>
          </AppBar>

          <Box sx={{ flexGrow: 1, overflow: "auto" }}>
            <InventoryPage selectedCategory={selectedCategory} />
          </Box>
        </Box>
      </Box>
    </>
  );
};
