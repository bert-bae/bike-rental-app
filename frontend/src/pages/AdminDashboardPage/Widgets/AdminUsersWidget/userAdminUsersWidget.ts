import React, { useEffect } from "react";
import {
  useCreateUserMutation,
  useDeleteUserMutation,
  useEditUserMutation,
  useGetUsersQuery,
} from "../../../../services/hooks/users";
import { TUserModel } from "../../../../types/entities.type";

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

  const resetForm = () => {
    toggleForm(false);
    setUserToEdit(undefined);
  };

  useEffect(() => {
    if (createSuccess || editSuccess || deleteSuccess) {
      resetForm();
    }
  }, [createSuccess, editSuccess, deleteSuccess]);

  return {
    userToEdit,
    users: users || [],
    formVisible,
    toggleForm,
    onShowUserForm: handleShowEditForm,
    onUserFormSubmmit: handleUserFormSubmit,
    onDeleteUser: handleUserDelete,
    onCancelUserForm: resetForm,
  };
};

export default useAdminUsersWidget;
