import React from "react";
import { Box, Button, Typography } from "@mui/material";
import DrawerForm from "../../../../components/DrawerForm";
import DataTable from "../../../../components/DataTable";
import WidgetWrapper from "../../../../components/WidgetWrapper";
import BikeForm from "../../../../components/EntityForms/BikeForm";
import useAdminBikesWidget from "./useAdminBikesWidget";

const AdminBikesWidget: React.FC<{}> = ({}) => {
  const {
    bikeToEdit,
    bikes,
    formVisible,
    toggleForm,
    onShowBikeEditForm,
    onBikeFormSubmit,
    onDeleteBike,
    onCancelBikeForm,
  } = useAdminBikesWidget();

  return (
    <WidgetWrapper>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding={"10px"}
      >
        <Typography variant="h6">
          <b>Bikes</b>
        </Typography>
        <Button onClick={() => toggleForm(true)}>Create Bike</Button>
      </Box>
      <DrawerForm visible={formVisible}>
        <BikeForm
          bike={bikeToEdit}
          onSubmit={onBikeFormSubmit}
          onCancel={onCancelBikeForm}
        />
      </DrawerForm>
      <DataTable
        title="Bikes"
        data={bikes}
        dataKeys={["model", "color", "location", "available"]}
        headers={["Model", "Color", "Location", "Available"]}
        actions={[
          { text: "Edit", action: onShowBikeEditForm },
          { text: "Delete", action: onDeleteBike },
        ]}
      />
    </WidgetWrapper>
  );
};

export default AdminBikesWidget;
