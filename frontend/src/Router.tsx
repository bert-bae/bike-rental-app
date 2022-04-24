import { Routes, Route } from "react-router-dom";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import MemberDashboardPage from "./pages/MemberDashboard";
import LoginPage from "./pages/LoginPage";

import "./App.css";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MemberDashboardPage />} />
      <Route path="/admin" element={<AdminDashboardPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};
export default Router;
