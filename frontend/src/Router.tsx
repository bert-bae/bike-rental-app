import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import MemberDashboardPage from "./pages/MemberDashboardPage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import { TStoreModel } from "./redux";

import "./App.css";
import { UserRoleEnum } from "./types/entities.type";

const Router = () => {
  const { jwt, role } = useSelector((state: TStoreModel) => state.auth);
  const { pathname } = useLocation();

  if (!jwt) {
    if (pathname === "/admin") {
      return <Navigate to="/login" />;
    }
    if (pathname === "/") {
      return <Navigate to="/login" />;
    }
  }

  if (!jwt && role === UserRoleEnum.Member && pathname === "/admin") {
    return <Navigate to="/" />;
  }

  if ((jwt && pathname === "/login") || (jwt && pathname === "/register")) {
    return <Navigate to={role === UserRoleEnum.Admin ? "/admin" : "/"} />;
  }

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
