import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import MemberDashboardPage from "./pages/MemberDashboard";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import { TStoreModel } from "./redux";

import "./App.css";

const Router = () => {
  const { userId } = useSelector((state: TStoreModel) => state.auth);
  const navigate = useNavigate();
  // TODO: redirections based on url path

  return (
    <Routes>
      <Route path="/" element={<MemberDashboardPage />} />
      <Route path="/admin" element={<AdminDashboardPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
    </Routes>
  );
};
export default Router;
