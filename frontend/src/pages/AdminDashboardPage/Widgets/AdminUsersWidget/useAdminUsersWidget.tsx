import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import {
  useCreateUserMutation,
  useDeleteUserMutation,
  useEditUserMutation,
  useGetUsersQuery,
} from "../../../../services/hooks/users";
import { TUserModel } from "../../../../types/entities.type";

const columns = [
  { key: "name", label: "Name" },
  { key: "username", label: "Username" },
  { key: "role", label: "Role" },
];

const useAdminUsersWidget = () => {
  const [userToEdit, setUserToEdit] = React.useState<TUserModel | void>();
  const { data: users } = useGetUsersQuery();
  const { mutate: createUser, isSuccess: createSuccess } =
    useCreateUserMutation();
  const { mutate: editUser, isSuccess: editSuccess } = useEditUserMutation();
  const { mutate: deleteUser, isSuccess: deleteSuccess } =
    useDeleteUserMutation();
  const [formVisible, setFormVisible] = React.useState(false);

  const toggleForm = (force: boolean) => {
    force ?? false ? setFormVisible((prev) => !prev) : setFormVisible(force);
  };

  const handleShowEditForm = (user: TUserModel) => {
    setUserToEdit(user);
    toggleForm(true);
  };

  const handleUserFormSubmit = (user: TUserModel) => {
    if (user.id) {
      editUser(user);
    } else {
      createUser(user);
    }
  };

  const handleUserDelete = (user: TUserModel) => {
    deleteUser(user.id);
  };

  const resetForm = React.useCallback(() => {
    toggleForm(false);
    setUserToEdit(undefined);
  }, [setUserToEdit]);

  const actionColumn = {
    key: "actions",
    label: "Actions",
    render: (value: any, row: TUserModel) => {
      return (
        <Box>
          <Button
            key={`edit:${row.id}`}
            type="button"
            variant="outlined"
            style={{ margin: "5px" }}
            onClick={() => handleShowEditForm(row)}
          >
            Edit
          </Button>
          <Button
            key={`delete:${row.id}`}
            type="button"
            variant="outlined"
            style={{ margin: "5px" }}
            onClick={() => handleUserDelete(row)}
          >
            Delete
          </Button>
        </Box>
      );
    },
  };

  useEffect(() => {
    if (createSuccess || editSuccess || deleteSuccess) {
      resetForm();
    }
  }, [createSuccess, editSuccess, deleteSuccess, resetForm]);

  return {
    userToEdit,
    users: users || [],
    formVisible,
    columns: [...columns, actionColumn],
    toggleForm,
    onUserFormSubmmit: handleUserFormSubmit,
    onCancelUserForm: resetForm,
  };
};

export default useAdminUsersWidget;
