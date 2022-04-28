import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import usersApi from "../api/users";
import adminUsersApi from "../api/admin/users";
import notify from "../../utils/notify";
/* eslint-disable */

export const useGetUsersQuery = () => {
  const { jwt } = useSelector((state) => state.auth);
  const readBikes = async () => {
    return adminUsersApi.read({ headers: { Authorization: jwt } });
  };

  return useQuery({
    queryFn: readBikes,
    queryKey: ["readUsers"],
    onError: () => {},
    onSuccess: ({ data }) => {},
  });
};

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();
  const { jwt } = useSelector((state) => state.auth);
  const create = async (user) => {
    return usersApi.create({ body: user, headers: { Authorization: jwt } });
  };

  return useMutation(create, {
    onError: () => {},
    onSuccess: (data) => {
      notify("success", {
        title: "Success",
        message: "User created successfully",
      });
      queryClient.invalidateQueries("readUsers");
    },
  });
};

export const useEditUserMutation = () => {
  const queryClient = useQueryClient();
  const { jwt } = useSelector((state) => state.auth);
  const edit = async ({ id, ...user }) => {
    return adminUsersApi.edit({
      id,
      body: user,
      headers: { Authorization: jwt },
    });
  };

  return useMutation(edit, {
    onError: () => {},
    onSuccess: () => {
      notify("success", {
        title: "Success",
        message: "User updated successfully",
      });
      queryClient.invalidateQueries("readUsers");
    },
  });
};

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();
  const { jwt } = useSelector((state) => state.auth);
  const destroyBike = async (id) => {
    return adminUsersApi.destroy({
      id,
      headers: { Authorization: jwt },
    });
  };

  return useMutation(destroyBike, {
    onError: () => {},
    onSuccess: () => {
      notify("success", {
        title: "Success",
        message: "User deleted successfully",
      });
      queryClient.invalidateQueries("readUsers");
    },
  });
};
