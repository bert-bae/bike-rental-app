import React from "react";
import { Box, Typography } from "@mui/material";
import DataTable from "../../../../components/DataTable";
import AdminReservationTableFilters from "../../../../components/DataTable/EntityFilters/AdminReservationTableFilters";
import WidgetWrapper from "../../../../components/WidgetWrapper";
import useAdminReservationsWidget from "./useAdminReservationsWidget";

const AdminReservationsWidget: React.FC<any> = (props) => {
  const { reservations, columns, onSearch, onReset } =
    useAdminReservationsWidget();

  return (
    <WidgetWrapper>
      <Box padding={"10px"}>
        <Typography variant="h6">
          <b>Reservations</b>
        </Typography>
      </Box>
      <AdminReservationTableFilters onSearch={onSearch} onReset={onReset} />
      <DataTable
        title="Reservations"
        rows={reservations}
        columns={columns as any}
      />
    </WidgetWrapper>
  );
};

export default AdminReservationsWidget;
