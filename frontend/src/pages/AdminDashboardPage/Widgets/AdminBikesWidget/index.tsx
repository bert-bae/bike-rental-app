import React from "react";
import { Box, Button, Typography } from "@mui/material";
import DrawerForm from "../../../../components/DrawerForm";
import DataTable from "../../../../components/DataTable";
import BikeTableFilters from "../../../../components/DataTable/EntityFilters/BikeTableFilters";
import WidgetWrapper from "../../../../components/WidgetWrapper";
import BikeForm from "../../../../components/EntityForms/BikeForm";
import useAdminBikesWidget from "./useAdminBikesWidget";

const AdminBikesWidget: React.FC<any> = (props) => {
  const {
    bikeToEdit,
    bikes,
    bikeLots,
    formVisible,
    columns,
    toggleForm,
    onBikeFormSubmit,
    onCancelBikeForm,
    onSearch,
    onSearchReset,
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
        <Button variant="contained" onClick={() => toggleForm(true)}>
          Create Bike
        </Button>
      </Box>
      <DrawerForm visible={formVisible} onClose={onCancelBikeForm}>
        <BikeForm
          bike={bikeToEdit}
          bikeLots={bikeLots}
          onSubmit={onBikeFormSubmit}
          onCancel={onCancelBikeForm}
        />
      </DrawerForm>
      <BikeTableFilters onSearch={onSearch} onReset={onSearchReset} />
      <DataTable title="Bikes" rows={bikes} columns={columns as any} />
    </WidgetWrapper>
  );
};

export default AdminBikesWidget;
