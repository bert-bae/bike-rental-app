import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import bikeReviewsApi from "../api/bikeReviews";

export const useGetReviews = () => {
  const { jwt } = useSelector((state) => state.auth);
  const readReviews = async () => {
    return bikeReviewsApi.read({ headers: { Authorization: jwt } });
  };

  return useQuery({
    queryFn: readReviews,
    queryKey: ["readReviews"],
    onError: () => {},
    onSuccess: () => {},
  });
};

export const useCreateReviewMutation = () => {
  const queryClient = useQueryClient();
  const { jwt } = useSelector((state) => state.auth);
  const reviewBike = async (review) => {
    return bikeReviewsApi.create({
      body: review,
      headers: { Authorization: jwt },
    });
  };

  return useMutation(reviewBike, {
    onError: () => {},
    onSuccess: () => {
      queryClient.invalidateQueries("readReservations");
    },
  });
};

export const useUpdateReviewMutation = () => {
  const queryClient = useQueryClient();
  const { jwt } = useSelector((state) => state.auth);
  const updateReview = async ({ id, review }) => {
    return bikeReviewsApi.edit({
      id,
      body: review, //  { rating: number } -> Payload for cancelling
      headers: { Authorization: jwt },
    });
  };

  return useMutation(updateReview, {
    onError: () => {},
    onSuccess: () => {
      queryClient.invalidateQueries("readReservations");
    },
  });
};
