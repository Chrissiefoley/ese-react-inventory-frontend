import { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Avatar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ImageUpload } from "../../components/ImageUpload.tsx";
import { inventory } from "../../api/inventory.js";

export const AddProductPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [count, setCount] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
        count: parseInt(count),
        price: parseFloat(price),
        image: imageUrl,
      });
      alert("Product added successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error adding product:", error);
      setError("Failed to add product. Please try again.");
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

          <TextField
            required
            fullWidth
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            margin="normal"
          />

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              required
              label="Count"
              type="number"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              margin="normal"
              sx={{ flex: 1 }}
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
