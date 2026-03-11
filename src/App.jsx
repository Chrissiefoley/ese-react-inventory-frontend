import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/HomePage/index.tsx";
import { AddProductPage } from "./pages/InventoryDashboard/AddProductPage.tsx";
import { LoginPage } from "./pages/Profile/LoginPage.tsx";
import { LogoutPage } from "./pages/Profile/LogoutPage.tsx";
import { UserProfile } from "./pages/Profile/UserProfile.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
