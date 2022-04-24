import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import bikesApi from "../api/bikes";

export const useGetBikesQuery = () => {
  const { jwt } = useSelector((state) => state.auth);
  const readBikes = async () => {
    return bikesApi.read({ headers: { Authorization: jwt } });
  };

  return useQuery({
    queryFn: readBikes,
    queryKey: ["readBikes"],
    onError: () => {
      console.log("handleErrror");
    },
    onSuccess: ({ data }) => {},
  });
};

export const useGetBikeQuery = () => {
  const { jwt } = useSelector((state) => state.auth);
  const readBike = async (id) => {
    return bikesApi.readById({ id, headers: { Authorization: jwt } });
  };

  return useQuery({
    queryFn: readBike,
    queryKey: ["readBike"],
    onError: () => {
      console.log("handleErrror");
    },
    onSuccess: ({ data }) => {},
  });
};

export const useCreateBikeMutation = () => {
  const queryClient = useQueryClient();
  const { jwt } = useSelector((state) => state.auth);
  const create = async (bike) => {
    return bikesApi.create({ body: bike, headers: { Authorization: jwt } });
  };

  return useMutation(create, {
    onError: () => {
      console.log("handleErrror");
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries("readBikes");
    },
  });
};

export const useEditBikeMutation = () => {
  const queryClient = useQueryClient();
  const { jwt } = useSelector((state) => state.auth);
  const edit = async ({ id, ...bike }) => {
    return bikesApi.edit({
      id,
      body: bike,
      headers: { Authorization: jwt },
    });
  };

  return useMutation(edit, {
    onError: () => {
      console.log("handleErrror");
    },
    onSuccess: () => {
      queryClient.invalidateQueries("readBikes");
    },
  });
};

export const useDeleteBikeMutation = () => {
  const queryClient = useQueryClient();
  const { jwt } = useSelector((state) => state.auth);
  const destroyBike = async (id) => {
    return bikesApi.destroy({
      id,
      headers: { Authorization: jwt },
    });
  };

  return useMutation(destroyBike, {
    onError: () => {
      console.log("handleErrror");
    },
    onSuccess: () => {
      queryClient.invalidateQueries("readBikes");
    },
  });
};
