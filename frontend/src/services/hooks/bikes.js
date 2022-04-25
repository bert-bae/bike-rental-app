import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import bikesApi from "../api/bikes";

export const useGetBikesQuery = (keys) => {
  const { jwt } = useSelector((state) => state.auth);
  const readBikes = async ({ queryKey }) => {
    const [_key, filters] = queryKey;
    return bikesApi.read({ filters, headers: { Authorization: jwt } });
  };

  return useQuery({
    queryFn: readBikes,
    queryKey: ["readBikes", keys],
    onError: () => {},
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
    onError: () => {},
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
    onError: () => {},
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
    onError: () => {},
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
    onError: () => {},
    onSuccess: () => {
      queryClient.invalidateQueries("readBikes");
    },
  });
};
