import {
  Container,
  Box,
  Typography,
  Link,
  Avatar,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ImageUpload } from "../../components/ImageUpload.tsx";
import { getCurrentUser, updateUserProfile } from "../../api/users";

export const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Fetch user data on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data);
      } catch (err) {
        if (err.response?.status === 401) {
          navigate("/login?redirect=profile&message=session_expired");
          return;
        }
        setError("Failed to load profile");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  // Handle avatar upload
  const handleAvatarUpload = async (cloudinaryUrl) => {
    setUploading(true);
    setError("");
    try {
      const updatedUser = await updateUserProfile({ avatar: cloudinaryUrl });
      setUser(updatedUser);
      setEditing(false);
    } catch (err) {
      setError("Failed to update avatar. Make sure the image is uploaded to Cloudinary.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container>
        <Alert severity="error">Failed to load profile data</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Hi, {user.username}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ mt: 3, mb: 3 }}>
          <Avatar
            src={user.user_info.avatar || "https://via.placeholder.com/150"}
            sx={{ width: 150, height: 150, mb: 2 }}
          />

          {!editing && (
            <Button
              variant="outlined"
              onClick={() => setEditing(true)}
              sx={{ mb: 2 }}
            >
              Change Avatar
            </Button>
          )}

          {editing && (
            <Box sx={{ mb: 2 }}>
              <ImageUpload onUpload={handleAvatarUpload} />
              <Button
                variant="text"
                onClick={() => setEditing(false)}
                sx={{ mt: 1 }}
              >
                Cancel
              </Button>
            </Box>
          )}

          {uploading && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CircularProgress size={20} />
              <Typography variant="body2">Updating avatar...</Typography>
            </Box>
          )}

          <Typography variant="h6" sx={{ mt: 2 }}>
            Employee ID: {user.user_info.employee_id}
          </Typography>
          <Typography variant="h6">Email: {user.email}</Typography>
          <Typography variant="h6">Role: {user.role}</Typography>
          <Typography variant="h6">
            Contact: {user.user_info.contact_info}
          </Typography>
        </Box>

        <Link component="button" onClick={() => navigate(-1)}>
          Go back
        </Link>
      </Box>
    </Container>
  );
};
