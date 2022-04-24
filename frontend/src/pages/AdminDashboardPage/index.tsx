import React from "react";
import Page from "../../components/Page";
import AdminBikesWidget from "./Widgets/AdminBikesWidget";
import AdminUsersWidget from "./Widgets/AdminUsersWidget";

type AdminDashboardPageProps = React.FC<any>;

const AdminDashboardPage: AdminDashboardPageProps = (props) => {
  return (
    <Page pageTitle="Admin Dashboard">
      <AdminBikesWidget />
      <AdminUsersWidget />
    </Page>
  );
};

export default AdminDashboardPage;
