import { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Avatar,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ImageUpload } from "../../components/ImageUpload.tsx";
import { inventory } from "../../api/inventory.js";

export const AddProductPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [categoryMode, setCategoryMode] = useState("select"); 
  const [existingCategories, setExistingCategories] = useState<string[]>([]);
  const [count, setCount] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const items = await inventory.getItems();
        const categories = [...new Set(items.map((item: any) => item.category))];
        setExistingCategories(categories.sort());
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleImageUpload = (url: string) => {
    setImageUrl(url);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await inventory.createItem({
        name,
        description,
        category,
        count: count ? parseInt(count) : 0,
        price: parseFloat(price),
        image: imageUrl,
      });
      alert("Product added successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error adding product:", error);
      if (error.response?.status === 400 && error.response?.data?.name) {
        setError("Product already exists with this name.");
      } else {
        setError("Failed to add product. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4">Add New Product</Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            required
            fullWidth
            label="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
          />

          <TextField
            required
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
            multiline
            rows={3}
          />

          {categoryMode === "select" ? (
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                onChange={(e) => {
                  if (e.target.value === "__add_new__") {
                    setCategoryMode("custom");
                    setCategory("");
                  } else {
                    setCategory(e.target.value);
                  }
                }}
                label="Category"
              >
                {existingCategories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
                <MenuItem value="__add_new__" sx={{ fontStyle: "italic", color: "primary.main" }}>
                  + Add new category
                </MenuItem>
              </Select>
            </FormControl>
          ) : (
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <TextField
                required
                fullWidth
                label="New Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                margin="normal"
              />
              <Button
                variant="outlined"
                onClick={() => {
                  setCategoryMode("select");
                  setCategory("");
                }}
                sx={{ mt: 1 }}
              >
                Cancel
              </Button>
            </Box>
          )}

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Count"
              type="number"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              margin="normal"
              sx={{ flex: 1 }}
              inputProps={{ min: 0 }}
            />

            <TextField
              required
              label="Price (£)"
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              margin="normal"
              sx={{ flex: 1 }}
              inputProps={{ min: 0 }}
            />
          </Box>

          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Product Image (Optional)
            </Typography>
            <ImageUpload onUpload={handleImageUpload} />
            {imageUrl && (
              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Image Preview:
                </Typography>
                <Avatar
                  src={imageUrl}
                  alt="Product preview"
                  variant="rounded"
                  sx={{ width: 150, height: 150, margin: "0 auto" }}
                />
              </Box>
            )}
          </Box>

          <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{ py: 1.5 }}
            >
              {loading ? "Adding..." : "Add Product"}
            </Button>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => navigate("/")}
              sx={{ py: 1.5 }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};
