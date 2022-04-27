import React from "react";
import { Box, Typography } from "@mui/material";
import DataTable from "../../../../components/DataTable";
import WidgetWrapper from "../../../../components/WidgetWrapper";
import useMemberReservationsWidget from "./useMemberReservationsWidget";
import FormDialogWrapper from "../../../../components/FormDialogWrapper";
import BikeReviewForm from "../../../../components/EntityForms/BikeReviewForm";

const MemberReservationsWidget: React.FC<any> = (props) => {
  const {
    reservations,
    reviewFormVisible,
    columns,
    bikeToReview,
    toggleReviewForm,
    onReviewSubmit,
  } = useMemberReservationsWidget();

  return (
    <WidgetWrapper>
      <Box padding={"10px"}>
        <Typography variant="h6">
          <b>My Reservations</b>
        </Typography>
      </Box>
      <DataTable
        title="Reservations"
        rows={reservations}
        columns={columns as any}
      />
      <FormDialogWrapper
        visible={reviewFormVisible}
        title="Bike Review"
        description="How was your experience with this bike? Let us know so we can continue to improve the experience of our customers."
        onClose={() => toggleReviewForm(false)}
        Form={
          <BikeReviewForm
            review={bikeToReview?.reviews && bikeToReview?.reviews[0]}
            onSubmit={onReviewSubmit}
          />
        }
      />
    </WidgetWrapper>
  );
};

export default MemberReservationsWidget;
