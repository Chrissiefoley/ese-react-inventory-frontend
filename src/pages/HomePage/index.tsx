import React from "react";
import { menuData } from "../../content/content.ts";
import {
  AppBar,
  Toolbar,
  Grid,
  Container,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { MenuCard } from "../../components/MenuCard.tsx";
import SideMenu from "../../components/SideMenu.tsx";

export const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [inventoryList, setInventoryList] = React.useState(menuData);

  const handleUpdate = (id: number, newStock: number) => {
    setInventoryList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, stock: newStock } : item,
      ),
    );
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
            <Button sx={{ color: "#b0b1bdff", alignContent: "flex-end" }}>
              Log out
            </Button>
          </AppBar>

          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontWeight: 600, mb: 3 }}
            >
              Inventory Dashboard
            </Typography>

            <Grid container spacing={3}>
              {filteredStock.map((item) => (
                <Grid size={12} key={item.id}>
                  <MenuCard
                    item={item}
                    onSaveStock={(newVal) => handleUpdate(item.id, newVal)}
                  />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};
