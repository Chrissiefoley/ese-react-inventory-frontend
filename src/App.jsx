import { useState, useEffect } from "react";
import {
  useNavigate,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/HomePage/index.tsx";
import { AddProductPage } from "./pages/InventoryDashboard/AddProductPage.tsx";
import { LoginPage } from "./pages/Profile/LoginPage.tsx";
import { LogoutPage } from "./pages/Profile/LogoutPage.tsx";
import { UserProfile } from "./pages/Profile/UserProfile.tsx";
import { apiClient } from "./api/client";
import * as authApi from "./api/auth";
import { PasswordResetPage } from "./pages/Profile/ResetPasswordPage.tsx";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const isAuthenticated = !!user;

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await apiClient.get("/auth/me/");
        setUser(response.data);
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkUser();
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const response = await authApi.login(credentials);
      setUser(response.user);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error(
        "Logout failed:",
        error.response ? error.response.data : error.message,
      );
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        }
      />
      <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
      <Route path="/logout" element={<LogoutPage />} />
      <Route path="/add-product" element={<AddProductPage />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/password-reset" element={<PasswordResetPage />} />
    </Routes>
  );
}

export default App;
