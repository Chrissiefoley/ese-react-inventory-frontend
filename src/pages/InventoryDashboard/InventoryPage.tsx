import React, { useEffect, useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Grid, Container, Typography, IconButton } from "@mui/material";
import { MenuCard } from "../../components/InventoryCard.tsx";
import { useNavigate } from "react-router-dom";
import { inventory } from "../../api/inventory.js";

interface InventoryItem {
  id: number;
  name: string;
  description: string;
  category: string;
  count: number;
  price: string;
  image?: string;
}

export const InventoryPage: React.FC = () => {
  const [inventoryList, setInventoryList] = useState<InventoryItem[]>([]);
  const navigate = useNavigate();

  const fetchInventory = async () => {
    try {
      const data = await inventory.getItems();
      setInventoryList(data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleUpdate = async (id: number, newStock: number) => {
    try {
      await inventory.updateItem(id, { count: newStock });
      await fetchInventory();
    } catch (error) {
      console.error("Error updating inventory:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await inventory.deleteItem(id);
      await fetchInventory();
    } catch (error) {
      console.error("Error deleting inventory:", error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          Inventory Dashboard
        </Typography>
        <IconButton onClick={() => navigate("/add-product")}>
          <AddBoxIcon onClick={() => navigate("/add-product")} />
          <Typography>Add new item</Typography>
        </IconButton>
      </Grid>
      <Grid container spacing={3}>
        {inventoryList.map((item) => (
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
