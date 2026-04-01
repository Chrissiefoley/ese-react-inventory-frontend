import {
  Container,
  Box,
  Typography,
  Link,
  Avatar,
  Button,
  CircularProgress,
  Alert,
  Paper,
  Divider,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ImageUpload } from "../../components/ImageUpload";
import { getCurrentUser, updateUserProfile } from "../../api/users";
import { User } from "../../types";

export const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingContact, setEditingContact] = useState(false);
  const [contactValue, setContactValue] = useState("");
  const [savingContact, setSavingContact] = useState(false);

  // Fetch user data on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data);
      } catch (err: any) {
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
  const handleAvatarUpload = async (cloudinaryUrl: string) => {
    setUploading(true);
    setError("");
    try {
      const updatedUser = await updateUserProfile({ avatar: cloudinaryUrl });
      setUser(updatedUser);
      setEditing(false);
    } catch (err: any) {
      setError("Failed to update avatar. Make sure the image is uploaded to Cloudinary.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  // Handle contact info update
  const handleContactEdit = () => {
    setContactValue(user?.user_info?.contact_info || "");
    setEditingContact(true);
  };

  const handleContactSave = async () => {
    setSavingContact(true);
    setError("");
    try {
      const updatedUser = await updateUserProfile({ contact_info: contactValue });
      setUser(updatedUser);
      setEditingContact(false);
    } catch (err: any) {
      setError("Failed to update contact information.");
      console.error(err);
    } finally {
      setSavingContact(false);
    }
  };

  const handleContactCancel = () => {
    setEditingContact(false);
    setContactValue("");
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
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Paper elevation={3} sx={{ p: 4, width: "100%", textAlign: "center" }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            User Profile
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Avatar
            src={user.user_info.avatar || "https://via.placeholder.com/150"}
            sx={{ width: 120, height: 120, mx: "auto", mb: 2 }}
          />

          {!editing && (
            <Button
              variant="outlined"
              onClick={() => setEditing(true)}
              sx={{
                mb: 3,
                backgroundColor: "#1a237e",
                color: "white",
                "&:hover": { backgroundColor: "#0d1642" }
              }}
            >
              Change Avatar
            </Button>
          )}

          {editing && (
            <Box sx={{ mb: 3 }}>
              <ImageUpload onUpload={handleAvatarUpload} />
              <Button
                variant="outlined"
                onClick={() => setEditing(false)}
                sx={{
                  mt: 2,
                  backgroundColor: "#1a237e",
                  color: "white",
                  "&:hover": { backgroundColor: "#0d1642" }
                }}
              >
                Cancel
              </Button>
            </Box>
          )}

          {uploading && (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1, mb: 3 }}>
              <CircularProgress size={20} />
              <Typography variant="body2">Updating avatar...</Typography>
            </Box>
          )}

          <Divider sx={{ my: 3 }} />

          <Box sx={{ textAlign: "left" }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              <strong>Username:</strong> {user.username}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              <strong>Email:</strong> {user.email}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              <strong>Employee ID:</strong> {user.user_info.employee_id}
            </Typography>

            {/* Contact Info - Editable */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1" component="span">
                <strong>Contact:</strong>{" "}
              </Typography>
              {!editingContact ? (
                <>
                  <Typography variant="body1" component="span">
                    {user.user_info.contact_info || "N/A"}
                  </Typography>
                  <Button
                    size="small"
                    onClick={handleContactEdit}
                    sx={{
                      ml: 2,
                      minWidth: "auto",
                      px: 2,
                      backgroundColor: "#1a237e",
                      color: "white",
                      "&:hover": { backgroundColor: "#0d1642" }
                    }}
                  >
                    Edit
                  </Button>
                </>
              ) : (
                <Box sx={{ mt: 1 }}>
                  <TextField
                    fullWidth
                    size="small"
                    value={contactValue}
                    onChange={(e) => setContactValue(e.target.value)}
                    placeholder="+1234567890"
                    sx={{ mb: 1 }}
                  />
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      size="small"
                      onClick={handleContactSave}
                      disabled={savingContact}
                      sx={{
                        backgroundColor: "#1a237e",
                        color: "white",
                        "&:hover": { backgroundColor: "#0d1642" }
                      }}
                    >
                      {savingContact ? "Saving..." : "Save"}
                    </Button>
                    <Button
                      size="small"
                      onClick={handleContactCancel}
                      disabled={savingContact}
                      sx={{
                        backgroundColor: "#1a237e",
                        color: "white",
                        "&:hover": { backgroundColor: "#0d1642" }
                      }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Link
            component="button"
            onClick={() => navigate("/")}
            sx={{ fontSize: "0.9rem", color: "#1a237e" }}
          >
            Back to Dashboard
          </Link>
        </Paper>
      </Box>
    </Container>
  );
};
