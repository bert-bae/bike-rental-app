import React from "react";
import { Box, Typography } from "@mui/material";
import DataTable from "../../../../components/DataTable";
import WidgetWrapper from "../../../../components/WidgetWrapper";
import useAdminReservationsWidget from "./useAdminReservationsWidget";

const AdminReservationsWidget: React.FC<any> = (props) => {
  const { reservations, columns } = useAdminReservationsWidget();

  return (
    <WidgetWrapper>
      <Box padding={"10px"}>
        <Typography variant="h6">
          <b>Reservations</b>
        </Typography>
      </Box>
      <DataTable
        title="Reservations"
        rows={reservations}
        columns={columns as any}
      />
    </WidgetWrapper>
  );
};

export default AdminReservationsWidget;
