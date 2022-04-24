import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import usersApi from "../api/users";

export const useGetUsersQuery = () => {
  const { jwt } = useSelector((state) => state.auth);
  const readBikes = async () => {
    return usersApi.read({ headers: { Authorization: jwt } });
  };

  return useQuery({
    queryFn: readBikes,
    queryKey: ["readUsers"],
    onError: () => {
      console.log("handleErrror");
    },
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
    onError: () => {
      console.log("handleErrror");
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries("readUsers");
    },
  });
};

export const useEditUserMutation = () => {
  const queryClient = useQueryClient();
  const { jwt } = useSelector((state) => state.auth);
  const edit = async ({ id, ...user }) => {
    return usersApi.edit({
      id,
      body: user,
      headers: { Authorization: jwt },
    });
  };

  return useMutation(edit, {
    onError: () => {
      console.log("handleErrror");
    },
    onSuccess: () => {
      queryClient.invalidateQueries("readUsers");
    },
  });
};

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();
  const { jwt } = useSelector((state) => state.auth);
  const destroyBike = async (id) => {
    return usersApi.destroy({
      id,
      headers: { Authorization: jwt },
    });
  };

  return useMutation(destroyBike, {
    onError: () => {
      console.log("handleErrror");
    },
    onSuccess: () => {
      queryClient.invalidateQueries("readUsers");
    },
  });
};
