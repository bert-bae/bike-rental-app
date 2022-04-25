import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import reservationsApi from "../api/reservations";

export const useGetReservations = () => {
  const { jwt } = useSelector((state) => state.auth);
  const readBikes = async () => {
    return reservationsApi.read({ headers: { Authorization: jwt } });
  };

  return useQuery({
    queryFn: readBikes,
    queryKey: ["readReservations"],
    onError: () => {
      console.log("handleErrror");
    },
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
    onError: () => {
      console.log("handleErrror");
    },
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
    onError: () => {
      console.log("handleErrror");
    },
    onSuccess: () => {
      queryClient.invalidateQueries("readReservations");
    },
  });
};
