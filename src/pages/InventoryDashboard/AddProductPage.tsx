import { useState } from "react";
import { ImageUpload } from "../../components/ImageUpload.tsx";
import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const AddProductPage = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleImageUpload = (url: string) => {
    setImageUrl(url);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log({
      productName,
      productDescription,
      imageUrl,
    });
    alert("Product added (check console for data)");
  };
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="productName">Product Name</label>
          <input
            id="productName"
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="productDescription">Product Description</label>
          <textarea
            id="productDescription"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            style={styles.textarea}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label>Product Image</label>
          <ImageUpload onUpload={handleImageUpload} />
          {imageUrl && (
            <div style={styles.imagePreview}>
              <p>Image uploaded:</p>
              <img
                src={imageUrl}
                alt="Uploaded Product"
                style={styles.previewImage}
              />
            </div>
          )}
        </div>
        <button type="submit" style={styles.submitButton}>
          Add Product
        </button>
        <Link component="button" type="button" onClick={() => navigate(-1)}>
          Go back
        </Link>
      </form>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "20px",
    maxWidth: "700px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  input: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  textarea: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "16px",
    minHeight: "100px",
  },
  imagePreview: {
    marginTop: "10px",
  },
  previewImage: {
    maxWidth: "200px",
    marginTop: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
  },
  submitButton: {
    padding: "12px 20px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007bff",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
  },
};
