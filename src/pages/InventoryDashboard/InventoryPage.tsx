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

export const InventoryPage: React.FC = () => {
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
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          Inventory Dashboard
        </Typography>
        <IconButton>
          <AddBoxIcon />
          <Typography>Add new item</Typography>
        </IconButton>
      </Grid>
      <Grid container spacing={3}>
        {filteredStock.map((item) => (
          <Grid size={12} key={item.id}>
            <MenuCard
              item={item}
              onSaveStock={(newVal) => handleUpdate(item.id, newVal)}
              onDelete={() => handleDelete(item.id)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
