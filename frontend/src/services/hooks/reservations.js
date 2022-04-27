import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import reservationsApi from "../api/reservations";
import adminReservationsApi from "../api/admin/reservations";
/* eslint-disable */

export const useGetBikeReservations = () => {
  const { jwt } = useSelector((state) => state.auth);
  const readBikes = async () => {
    return reservationsApi.read({ headers: { Authorization: jwt } });
  };

  return useQuery({
    queryFn: readBikes,
    queryKey: ["readReservations"],
    onError: () => {},
    onSuccess: () => {},
  });
};

export const useGetUserReservations = () => {
  const { jwt } = useSelector((state) => state.auth);
  const readBikes = async () => {
    return reservationsApi.read({ headers: { Authorization: jwt } });
  };

  return useQuery({
    queryFn: readBikes,
    queryKey: ["readReservations"],
    onError: () => {},
    onSuccess: () => {},
  });
};

export const useCreateReservationMutation = () => {
  const queryClient = useQueryClient();
  const { jwt } = useSelector((state) => state.auth);
  const reserveBike = async (reservation) => {
    return reservationsApi.create({
      body: reservation,
      headers: { Authorization: jwt },
    });
  };

  return useMutation(reserveBike, {
    onError: () => {},
    onSuccess: () => {
      queryClient.invalidateQueries("readReservations");
    },
  });
};

export const useUpdateReservationMutation = () => {
  const queryClient = useQueryClient();
  const { jwt } = useSelector((state) => state.auth);
  const updateReservation = async ({ id, reservation }) => {
    return reservationsApi.edit({
      id,
      body: reservation, //  { status: "Cancelled" } -> Payload for cancelling
      headers: { Authorization: jwt },
    });
  };

  return useMutation(updateReservation, {
    onError: () => {},
    onSuccess: () => {
      queryClient.invalidateQueries("readReservations");
    },
  });
};

export const useGetAllReservations = () => {
  const { jwt } = useSelector((state) => state.auth);
  const readBikes = async () => {
    return adminReservationsApi.read({ headers: { Authorization: jwt } });
  };

  return useQuery({
    queryFn: readBikes,
    queryKey: ["readReservations"],
    onError: () => {},
    onSuccess: () => {},
  });
};