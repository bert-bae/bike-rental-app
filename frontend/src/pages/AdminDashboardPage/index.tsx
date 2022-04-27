import React from "react";
import Page from "../../components/Page";
import AdminBikesWidget from "./Widgets/AdminBikesWidget";
import AdminUsersWidget from "./Widgets/AdminUsersWidget";
import AdminReservationsWidget from "./Widgets/AdminReservationsWidget";

type AdminDashboardPageProps = React.FC<any>;

const AdminDashboardPage: AdminDashboardPageProps = (props) => {
  return (
    <Page pageTitle="Admin Dashboard">
      <AdminReservationsWidget />
      <AdminBikesWidget />
      <AdminUsersWidget />
    </Page>
  );
};

export default AdminDashboardPage;
