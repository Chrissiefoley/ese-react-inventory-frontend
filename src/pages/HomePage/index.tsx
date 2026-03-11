import React from "react";
import { menuData } from "../../content/content.ts";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {
  AppBar,
  Toolbar,
  Grid,
  Container,
  Typography,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import { MenuCard } from "../../components/InventoryCard.tsx";
import SideMenu from "../../components/SideMenu.tsx";
import { useNavigate } from "react-router-dom";
import { InventoryPage } from "../InventoryDashboard/InventoryPage.tsx";

export const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [inventoryList, setInventoryList] = React.useState(menuData);
  const navigate = useNavigate();

  const handleUpdate = (id: number, newStock: number) => {
    setInventoryList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, count: newStock } : item,
      ),
    );
  };

  const handleDelete = (id: number) => {
    setInventoryList((prevList) => prevList.filter((item) => item.id !== id));
  };

  const filteredStock =
    selectedCategory === "All"
      ? menuData
      : menuData.filter((item) => item.category == selectedCategory);

  return (
    <>
      <Box sx={{ display: "flex", width: "100%" }}>
        <Box sx={{ flexShrink: 0 }}>
          <SideMenu onSelect={(category) => setSelectedCategory(category)} />
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
            {/*isAuthenticated*/}
            <Button
              sx={{ color: "#b0b1bdff", alignContent: "flex-end" }}
              onClick={() => navigate("/logout")}
            >
              Log out
            </Button>
          </AppBar>
          {/*isAuthenticated*/}
          <InventoryPage />
        </Box>
      </Box>
    </>
  );
};
