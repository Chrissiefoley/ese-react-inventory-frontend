import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Button,
  Grid,
  Popper,
  Popover,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { inventory } from "../api/inventory";

interface MenuItemProps {
  item: {
    id: number;
    name: string;
    description: string;
    category: string;
    count: number;
    price: string;
    image: string;
  };
  onSaveStock: (newStock: number) => void;
  onDelete: (id: number) => void;
}

export const MenuCard: React.FC<MenuItemProps> = ({
  item,
  onSaveStock,
  onDelete,
}) => {
  const [currentStock, setCurrentStock] = React.useState(item.count);
  const [onEdit, setOnEdit] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const handleSave = () => {
    onSaveStock(currentStock);
    setOnEdit(false);
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleConfirmDelete = async () => {
    await inventory.deleteItem(item.id);
    onDelete(item.id);
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Card elevation={2}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid size={8}>
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
          </Grid>
          <Grid size={4} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Box sx={{ p: 2 }}>
                <Typography>Are you sure you want to delete?</Typography>
                <Button onClick={handleConfirmDelete}>Yes</Button>
                <Button onClick={handleClose}>No</Button>
              </Box>
            </Popover>
          </Grid>
        </Grid>
        <Typography variant="caption" color="textSecondary">
          {item.description}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {item.price}
        </Typography>

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
