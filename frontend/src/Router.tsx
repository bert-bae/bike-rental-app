import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import MemberDashboard from "./pages/MemberDashboard";
import LoginPage from "./pages/LoginPage";

import "./App.css";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MemberDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};
export default Router;
