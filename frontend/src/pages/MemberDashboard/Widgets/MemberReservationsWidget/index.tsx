import React from "react";
import { Box, Typography } from "@mui/material";
import DataTable from "../../../../components/DataTable";
import WidgetWrapper from "../../../../components/WidgetWrapper";
import useMemberReservationsWidget from "./useMemberReservationsWidget";

const MemberReservationsWidget: React.FC<{}> = ({}) => {
  const { reservations, columns } = useMemberReservationsWidget();

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
    </WidgetWrapper>
  );
};

export default MemberReservationsWidget;
