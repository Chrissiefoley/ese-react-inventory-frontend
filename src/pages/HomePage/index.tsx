import React from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import SideMenu from "../../components/SideMenu.tsx";
import { useNavigate } from "react-router-dom";
import { InventoryPage } from "../InventoryDashboard/InventoryPage.tsx";

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
            onLogout={onLogout}
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
            <>
              <Typography sx={{ padding: "20px" }}>
                You must login to view this page
              </Typography>
              <Button onClick={() => navigate("/login")}>Log in</Button>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};
