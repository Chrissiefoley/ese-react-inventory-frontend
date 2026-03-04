import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

interface MenuItemProps {
  item: {
    id: number;
    name: string;
    category: string;
    stock: number;
    image: string;
  };
  onSaveStock: (newStock: number) => void;
}

export const MenuCard: React.FC<MenuItemProps> = ({ item, onSaveStock }) => {
  const [currentStock, setCurrentStock] = useState(item.stock);
  const [onEdit, setOnEdit] = useState(false);

  const handleSave = () => {
    onSaveStock(currentStock);
    setOnEdit(false);
  };

  return (
    <Card elevation={2}>
      <CardContent>
        <Typography variant="caption" color="textSecondary">
          {item.category}
        </Typography>
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold", mb: 2 }}
        >
          {item.name}
        </Typography>

        {/* This is the conditional rendering block */}
        {onEdit ? (
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <IconButton
              onClick={() => setCurrentStock(Math.max(0, currentStock - 1))}
            >
              <RemoveIcon />
            </IconButton>

            <Typography variant="body1" sx={{ mx: 2, fontWeight: "bold" }}>
              {currentStock}
            </Typography>

            <IconButton onClick={() => setCurrentStock(currentStock + 1)}>
              <AddIcon />
            </IconButton>
          </Box>
        ) : (
          <Typography variant="body2">{currentStock} in stock</Typography>
        )}

        <Button
          variant="outlined"
          size="small"
          onClick={onEdit ? handleSave : () => setOnEdit(!onEdit)}
          fullWidth
        >
          {onEdit ? "Save" : "Edit value"}
        </Button>
      </CardContent>
    </Card>
  );
};
