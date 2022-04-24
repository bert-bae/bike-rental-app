import React from "react";
import { Box, Button, Typography } from "@mui/material";
import DrawerForm from "../../../../components/DrawerForm";
import DataTable from "../../../../components/DataTable";
import UserForm from "../../../../components/EntityForms/UserForm";
import WidgetWrapper from "../../../../components/WidgetWrapper";
import userAdminUsersWidget from "./userAdminUsersWidget";

const AdminBikesWidget: React.FC<{}> = ({}) => {
  const {
    userToEdit,
    users,
    formVisible,
    toggleForm,
    onShowUserForm,
    onUserFormSubmmit,
    onDeleteUser,
    onCancelUserForm,
  } = userAdminUsersWidget();

  return (
    <WidgetWrapper>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding={"10px"}
      >
        <Typography variant="h6">
          <b>Users</b>
        </Typography>
        <Button onClick={() => toggleForm(true)}>Create User</Button>
      </Box>
      <DrawerForm visible={formVisible}>
        <UserForm
          user={userToEdit}
          onSubmit={onUserFormSubmmit}
          onCancel={onCancelUserForm}
        />
      </DrawerForm>
      <DataTable
        title="Users"
        data={users}
        dataKeys={["name", "username", "role"]}
        headers={["Name", "Username", "Role"]}
        actions={[
          { text: "Edit", action: onShowUserForm },
          { text: "Delete", action: onDeleteUser },
        ]}
      />
    </WidgetWrapper>
  );
};

export default AdminBikesWidget;
