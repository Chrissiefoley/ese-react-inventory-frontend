import { useState, useEffect } from "react";
import {
  useNavigate,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/HomePage/index";
import { AddProductPage } from "./pages/InventoryDashboard/AddProductPage";
import { LoginPage } from "./pages/Profile/LoginPage";
import { LogoutPage } from "./pages/Profile/LogoutPage";
import { UserProfile } from "./pages/Profile/UserProfile";
import { RegistrationPage } from "./pages/Profile/RegistrationPage";
import { apiClient } from "./api/client";
import * as authApi from "./api/auth";
import { User, LoginCredentials, RegisterData } from "./types";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const isAuthenticated = !!user;

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await apiClient.get<User>("/auth/me/");
        setUser(response.data);
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkUser();
  }, []);

  const handleLogin = async (credentials: LoginCredentials): Promise<void> => {
    try {
      const response = await authApi.login(credentials);
      setUser(response.user);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const handleRegister = async (registrationData: RegisterData): Promise<void> => {
    try {
      const response = await authApi.register(registrationData);
      setUser(response.user);
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const handleLogout = async (): Promise<void> => {
    try {
      await authApi.logout();
      setUser(null);
    } catch (error: any) {
      console.error(
        "Logout failed:",
        error.response ? error.response.data : error.message,
      );
      setUser(null);
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
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <HomePage isAuthenticated={isAuthenticated} onLogout={handleLogout} />
          ) : (
            <LoginPage onLogin={handleLogin} />
          )
        }
      />
      <Route
        path="/register"
        element={
          isAuthenticated ? (
            <HomePage isAuthenticated={isAuthenticated} onLogout={handleLogout} />
          ) : (
            <RegistrationPage onRegister={handleRegister} />
          )
        }
      />
      <Route path="/logout" element={<LogoutPage onLogout={handleLogout} />} />
      <Route path="/add-product" element={<AddProductPage />} />
      <Route path="/profile" element={<UserProfile />} />
    </Routes>
  );
}

export default App;
