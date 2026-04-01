import { useState } from "react";

const CLOUDINARY_UPLOAD_URL = (cloudName: string) =>
  `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

interface ImageUploadProps {
  onUpload: (url: string) => void;
}

export const ImageUpload = ({ onUpload }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME!;
  const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET!;


  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const response = await fetch(CLOUDINARY_UPLOAD_URL(cloudName), {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      onUpload(data.secure_url);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Failed to upload image");
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.uploadBox}>
        <label htmlFor="file-input" style={styles.uploadLabel}>
          {uploading ? "Uploading..." : "Click to upload an image"}
        </label>
        <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          disabled={uploading}
          style={{ display: "none" }}
        />
      </div>

      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "600px",
    margin: "20px 0",
  },
  uploadBox: {
    border: "2px dashed #ccc",
    borderRadius: "8px",
    padding: "30px",
    textAlign: "center",
    cursor: "pointer",
    backgroundColor: "#f9f9f9",
  },
  uploadLabel: {
    fontSize: "16px",
    color: "#666",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
};
