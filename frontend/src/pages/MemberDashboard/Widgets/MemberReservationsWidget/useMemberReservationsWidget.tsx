import React, { useEffect } from "react";
import * as dateFns from "date-fns";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import {
  useUpdateReservationMutation,
  useGetUserReservations,
} from "../../../../services/hooks/reservations";
import {
  useCreateReviewMutation,
  useUpdateReviewMutation,
} from "../../../../services/hooks/bikeReviews";
import {
  ReservationStatusEnum,
  TBikeModel,
  TBikeReviewModel,
  TReservationModel,
} from "../../../../types/entities.type";
import ReviewStars from "../../../../components/ReviewStars";

const columns = [
  {
    id: "bike:model",
    key: "bike",
    label: "Model",
    render: (bike: TBikeModel) => {
      return bike?.model;
    },
  },
  {
    id: "bike:color",
    key: "bike",
    label: "Color",
    render: (bike: TBikeModel) => {
      return bike?.color;
    },
  },
  {
    key: "startTime",
    label: "Start Time",
    render: (value: string) => {
      if (!value) {
        return;
      }

      const date = new Date(value);
      return dateFns.format(date, "Pp");
    },
  },
  {
    key: "endTime",
    label: "End Time",
    render: (value: string) => {
      if (!value) {
        return;
      }

      const date = new Date(value);
      return dateFns.format(date, "Pp");
    },
  },
  {
    key: "status",
    label: "Status",
    render: (value: string, row: any) => {
      if (value === ReservationStatusEnum.Cancelled) {
        <Chip label="Cancelled" color="warning" variant="outlined" />;
      }

      const startDate = new Date(row.startTime);
      const endDate = new Date(row.endTime);
      const now = new Date().getTime();

      const ongoing = now < endDate.getTime() && startDate.getTime() < now;
      if (ongoing) {
        return <Chip label="Active" color="success" variant="outlined" />;
      }

      const completed = now > endDate.setHours(endDate.getHours() - 1);
      if (completed) {
        return <Chip label="Complete" color="info" variant="outlined" />;
      }

      return <Chip label="Pending" color="primary" variant="outlined" />;
    },
  },
];

type BikeWithReviews = TBikeModel & { reviews: TBikeReviewModel[] };

const useMemberReservationsWidget = () => {
  const [bikeToReview, setBikeToReview] = React.useState<BikeWithReviews>();
  const [reviewFormVisible, setReviewFormVisible] = React.useState(false);
  const { data: reservations } = useGetUserReservations();
  const { mutate: updateReservation } = useUpdateReservationMutation();
  const { mutate: createReview, isSuccess: createReviewSuccess } =
    useCreateReviewMutation();
  const { mutate: updateReview, isSuccess: editReviewSuccess } =
    useUpdateReviewMutation();

  const cancelReservation = (reservation: TReservationModel) => {
    updateReservation({
      id: reservation.id,
      reservation: {
        bikeId: reservation.bikeId,
        status: ReservationStatusEnum.Cancelled,
      },
    });
  };

  const handleReviewSubmit = (rating: number) => {
    const review = bikeToReview?.reviews[0];
    if (review?.id) {
      return updateReview({
        id: review.id,
        review: { rating, bikeId: review.bikeId },
      });
    }

    if (!bikeToReview) {
      return;
    }

    createReview({
      bikeId: bikeToReview.id,
      rating,
    });
  };

  const resetReviewForm = () => {
    setBikeToReview(undefined);
    setReviewFormVisible(false);
  };

  const showReviewForm = (bike: BikeWithReviews) => {
    setBikeToReview(bike);
    setReviewFormVisible(true);
  };

  const toggleReviewForm = (force: boolean) => {
    force ?? false
      ? setReviewFormVisible((prev) => !prev)
      : setReviewFormVisible(force);
  };

  const actionColumns = [
    {
      id: "bikeReview",
      key: "bike",
      label: "Rating",
      render: (value: BikeWithReviews, row: any) => {
        if (row.status === ReservationStatusEnum.Cancelled) {
          return <Box> - </Box>;
        }

        const review = value?.reviews[0];
        return (
          <Button
            key={`reviewBike:${row.id}`}
            type="button"
            variant={review ? "text" : "outlined"}
            style={{ margin: "5px" }}
            disabled={!!review}
            onClick={() => showReviewForm(value)}
          >
            {!review ? "Review" : Math.round(Number(review.rating))}
          </Button>
        );
      },
    },
    {
      key: "actions",
      label: "Actions",
      render: (value: any, row: TReservationModel): React.ReactElement => {
        const date = new Date(row.startTime);
        const cancellationLimit =
          new Date().getTime() > date.setHours(date.getHours() - 1);
        if (
          row.status === ReservationStatusEnum.Cancelled ||
          cancellationLimit
        ) {
          return <Box> - </Box>;
        }

        return (
          <Box>
            <Button
              key={`cancelReservation:${row.id}`}
              type="button"
              variant="outlined"
              style={{ margin: "5px" }}
              color="error"
              onClick={() => cancelReservation(row)}
            >
              Cancel
            </Button>
          </Box>
        );
      },
    },
  ];

  useEffect(() => {
    if (editReviewSuccess || createReviewSuccess) {
      resetReviewForm();
    }
  }, [editReviewSuccess, createReviewSuccess]);

  return {
    reservations: reservations || [],
    reviewFormVisible,
    columns: [...columns, ...actionColumns],
    bikeToReview,
    toggleReviewForm,
    onReviewSubmit: handleReviewSubmit,
    onCancelReservation: cancelReservation,
  };
};
export default useMemberReservationsWidget;
