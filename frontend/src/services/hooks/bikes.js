import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import bikesApi from "../api/bikes";
import adminBikesApi from "../api/admin/bikes";

/* eslint-disable */

export const useGetReservableBikesQuery = (keys) => {
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
    keepPreviousData: true,
  });
};

export const useGetBikeQuery = (bikeId) => {
  const { jwt } = useSelector((state) => state.auth);
  const readBike = async ({ queryKey }) => {
    const [_key, bikeId] = queryKey;
    if (bikeId) {
      return bikesApi.readById({ id: bikeId, headers: { Authorization: jwt } });
    }
  };

  return useQuery({
    queryFn: readBike,
    queryKey: ["readBike", bikeId],
    onError: () => {},
    onSuccess: ({ data }) => {},
  });
};

// admin specific hooks
export const useGetBikesQuery = (keys) => {
  const { jwt } = useSelector((state) => state.auth);
  const readBikes = async ({ queryKey }) => {
    const [_key, filters] = queryKey;
    return adminBikesApi.read({ filters, headers: { Authorization: jwt } });
  };

  return useQuery({
    queryFn: readBikes,
    queryKey: ["readBikes", keys],
    onError: () => {},
    onSuccess: ({ data }) => {},
    keepPreviousData: true,
  });
};

export const useCreateBikeMutation = () => {
  const queryClient = useQueryClient();
  const { jwt } = useSelector((state) => state.auth);
  const create = async (bike) => {
    return adminBikesApi.create({
      body: bike,
      headers: { Authorization: jwt },
    });
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
    return adminBikesApi.edit({
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
    return adminBikesApi.destroy({
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
