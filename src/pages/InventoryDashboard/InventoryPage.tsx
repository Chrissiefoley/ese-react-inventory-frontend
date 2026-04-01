import React, { useEffect, useState, useCallback } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  IconButton,
  TextField,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Badge,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useNavigate } from "react-router-dom";
import { inventory } from "../../api/inventory";
import { ImageUpload } from "../../components/ImageUpload";
import { getCurrentUser } from "../../api/users";

interface InventoryItem {
  id: number;
  name: string;
  description: string;
  category: string;
  count: number;
  price: string;
  image?: string;
}

interface InventoryPageProps {
  selectedCategory?: string;
}

export const InventoryPage: React.FC<InventoryPageProps> = ({
  selectedCategory = "All",
}) => {
  const [inventoryList, setInventoryList] = useState<InventoryItem[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<{ count: number }>({ count: 0 });
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const navigate = useNavigate();

  const fetchInventory = useCallback(async () => {
    try {
      const data = await inventory.getItems();
      setInventoryList(data);
    } catch (error: any) {
      console.error("Error fetching inventory:", error);
      if (error.response?.status === 401) {
        navigate("/login");
      }
    }
  }, [navigate]);

  const fetchUserRole = useCallback(async () => {
    try {
      const user = await getCurrentUser();
      setIsVerified(user.is_staff_verified);
    } catch (error: any) {
      console.error("Error fetching user:", error);
      if (error.response?.status === 401) {
        navigate("/login");
      }
    }
  }, [navigate]);

  useEffect(() => {
    fetchInventory();
    fetchUserRole();
  }, [fetchInventory, fetchUserRole]);

  const filteredItems =
    selectedCategory === "All"
      ? inventoryList
      : inventoryList.filter((item) => item.category === selectedCategory);

  const handleEdit = (item: InventoryItem) => {
    setEditingId(item.id);
    setEditValues({ count: item.count });
  };

  const handleSave = async (id: number) => {
    try {
      await inventory.updateItem(id, { count: editValues.count });
      await fetchInventory();
      setEditingId(null);
    } catch (error) {
      console.error("Error updating inventory:", error);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await inventory.deleteItem(id);
        await fetchInventory();
      } catch (error) {
        console.error("Error deleting inventory:", error);
      }
    }
  };

  const handleImageClick = (itemId: number) => {
    setSelectedItemId(itemId);
    setImageDialogOpen(true);
  };

  const handleImageUpload = async (url: string) => {
    if (selectedItemId) {
      try {
        await inventory.updateItem(selectedItemId, { image: url });
        await fetchInventory();
        setImageDialogOpen(false);
        setSelectedItemId(null);
      } catch (error) {
        console.error("Error updating image:", error);
      }
    }
  };

  const columns = [
    { id: "image", label: "Image", width: "120px" },
    { id: "name", label: "Name" },
    { id: "category", label: "Category" },
    { id: "description", label: "Description" },
    { id: "stock", label: "Stock" },
    { id: "price", label: "Price", align: "right" as const },
    { id: "actions", label: "Actions", align: "center" as const },
  ];

  const renderCell = (columnId: string, item: InventoryItem) => {
    const canEdit = isVerified;

    switch (columnId) {
      case "image":
        return (
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              canEdit ? (
                <IconButton
                  size="small"
                  sx={{
                    backgroundColor: "primary.main",
                    color: "white",
                    width: 28,
                    height: 28,
                    "&:hover": { backgroundColor: "primary.dark" },
                  }}
                  onClick={() => handleImageClick(item.id)}
                >
                  <CameraAltIcon sx={{ fontSize: 16 }} />
                </IconButton>
              ) : null
            }
          >
            <Avatar
              src={item.image || "https://via.placeholder.com/80"}
              alt={item.name}
              variant="rounded"
              sx={{ width: 80, height: 80 }}
            />
          </Badge>
        );

      case "name":
        return (
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {item.name}
          </Typography>
        );

      case "category":
        return (
          <Chip
            label={item.category}
            size="small"
            color="primary"
            variant="outlined"
          />
        );

      case "description":
        return (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {item.description}
          </Typography>
        );

      case "stock":
        return editingId === item.id && canEdit ? (
          <TextField
            type="number"
            size="small"
            value={editValues.count}
            onChange={(e) =>
              setEditValues({ count: parseInt(e.target.value) || 0 })
            }
            sx={{ width: 70 }}
          />
        ) : (
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: item.count < 10 ? "error.main" : "inherit",
              }}
            >
              {item.count}
            </Typography>
            {item.count < 10 && (
              <Typography variant="caption" color="error">
                Low
              </Typography>
            )}
          </Box>
        );

      case "price":
        return (
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            £{parseFloat(item.price).toFixed(2)}
          </Typography>
        );

      case "actions":
        if (!canEdit) {
          return null;
        }

        return editingId === item.id ? (
          <Box sx={{ display: "flex", gap: 0.5, justifyContent: "center" }}>
            <IconButton
              size="small"
              color="success"
              onClick={() => handleSave(item.id)}
              title="Save"
            >
              <CheckIcon />
            </IconButton>
            <IconButton size="small" onClick={handleCancel} title="Cancel">
              <CloseIcon />
            </IconButton>
          </Box>
        ) : (
          <Box sx={{ display: "flex", gap: 0.5, justifyContent: "center" }}>
            <IconButton
              size="small"
              color="primary"
              onClick={() => handleEdit(item)}
              title="Edit Stock"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              size="small"
              color="error"
              onClick={() => handleDelete(item.id)}
              title="Delete Item"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: 2,
          mb: 3,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Inventory Dashboard
        </Typography>
        {isVerified && (
          <Button
            variant="contained"
            startIcon={<AddBoxIcon />}
            onClick={() => navigate("/add-product")}
            fullWidth={false}
            sx={{
              minWidth: { xs: "100%", sm: "auto" },
              backgroundColor: "#1a237e",
              "&:hover": { backgroundColor: "#0d1642" }
            }}
          >
            Add New Item
          </Button>
        )}
      </Box>

      <TableContainer
        component={Paper}
        elevation={2}
        sx={{
          overflowX: "auto",
          "&::-webkit-scrollbar": {
            height: 8,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,0.2)",
            borderRadius: 4,
          },
        }}
      >
        <Table sx={{ minWidth: 900 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              {columns.map((col) => (
                <TableCell
                  key={col.id}
                  sx={{ fontWeight: 700, width: col.width }}
                  align={col.align}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredItems.map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:hover": { backgroundColor: "#fafafa" } }}
              >
                {columns.map((col) => (
                  <TableCell key={col.id} align={col.align}>
                    {renderCell(col.id, item)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {filteredItems.length === 0 && (
        <Box sx={{ textAlign: "center", mt: 8 }}>
          <Typography variant="h6" color="text.secondary">
            {selectedCategory === "All"
              ? 'No items in inventory. Click "Add New Item" to get started.'
              : `No items in category "${selectedCategory}".`}
          </Typography>
        </Box>
      )}

      <Dialog
        open={imageDialogOpen}
        onClose={() => setImageDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Upload Item Image</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <ImageUpload onUpload={handleImageUpload} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setImageDialogOpen(false)}
            sx={{
              backgroundColor: "#1a237e",
              color: "white",
              "&:hover": { backgroundColor: "#0d1642" }
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
