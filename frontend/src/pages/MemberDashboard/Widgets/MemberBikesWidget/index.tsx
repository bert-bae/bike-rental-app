import React from "react";
import { Box, Typography } from "@mui/material";
import ReservationForm from "../../../../components/EntityForms/ReservationForm";
import DrawerForm from "../../../../components/DrawerForm";
import DataTable from "../../../../components/DataTable";
import BikeTableFilters from "../../../../components/DataTable/EntityFilters/BikeTableFilters";
import WidgetWrapper from "../../../../components/WidgetWrapper";
import useMemberBikesWidget from "./useMemberBikesWidget";
import { TBikeModel } from "../../../../types/entities.type";

const MemberBikesWidget: React.FC<{}> = ({}) => {
  const {
    bikeToReserve,
    bikes,
    formVisible,
    columns,
    onSearch,
    onSearchReset,
    onReservationSubmit,
    onCancelReservationForm,
  } = useMemberBikesWidget();

  return (
    <WidgetWrapper>
      <Box padding={"10px"}>
        <Typography variant="h6">
          <b>Bikes</b>
        </Typography>
      </Box>
      <DrawerForm visible={formVisible} onClose={onCancelReservationForm}>
        <ReservationForm
          bike={bikeToReserve as TBikeModel}
          onSubmit={onReservationSubmit}
          onCancel={onCancelReservationForm}
        />
      </DrawerForm>
      <BikeTableFilters onSearch={onSearch} onReset={onSearchReset} />
      <DataTable title="Bikes" columns={columns as any} rows={bikes} />
    </WidgetWrapper>
  );
};

export default MemberBikesWidget;
