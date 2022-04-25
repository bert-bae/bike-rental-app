import React from "react";
import Button from "@mui/material/Button";
import { useGetBikesQuery } from "../../../../services/hooks/bikes";
import { useCreateReservationMutation } from "../../../../services/hooks/reservations";
import { TBikeModel, TReservationModel } from "../../../../types/entities.type";
import { BikeFilters } from "../../../../components/DataTable/EntityFilters/BikeTableFilters";

const columns = [
  { key: "model", label: "Model" },
  { key: "color", label: "Color" },
  { key: "location", label: "Location" },
  { key: "rating", label: "Rating" },
  {
    key: "available",
    label: "Available",
    render: (bike: TBikeModel) => {
      return "Yes";
    },
  },
];

function formatData(bike: TBikeModel) {
  return { ...bike, available: true };
}

const useMemberBikesWidget = () => {
  const { mutate: reserveBike, isSuccess: reserveBikeSuccess } =
    useCreateReservationMutation();
  const [filters, setFilters] = React.useState<BikeFilters>();
  const { data: bikes } = useGetBikesQuery(filters);
  const [formVisible, setFormVisible] = React.useState(false);
  const [bikeToReserve, setBikeToReserve] = React.useState<TBikeModel>();

  const toggleForm = (force: boolean) => {
    force ?? false ? setFormVisible((prev) => !prev) : setFormVisible(force);
  };

  const handleShowReservationForm = (bike: TBikeModel) => {
    setBikeToReserve(bike);
    toggleForm(true);
  };

  const handleReservationSubmit = (
    reservation: Pick<TReservationModel, "startTime" | "endTime">
  ) => {
    reserveBike({ ...reservation, bikeId: bikeToReserve?.id });
  };

  const resetForm = () => {
    toggleForm(false);
    setBikeToReserve(undefined);
  };

  const handleFilteredSearch = (filters: BikeFilters) => {
    setFilters(filters);
  };

  const handleSearchReset = () => {
    setFilters(undefined);
  };

  const actionColumn = {
    key: "actions",
    label: "Actions",
    render: (value: any, row: TBikeModel) => {
      return (
        <Button
          key={`reserve:${row.id}`}
          type="button"
          variant="outlined"
          style={{ margin: "5px" }}
          onClick={() => handleShowReservationForm(row)}
        >
          Reserve
        </Button>
      );
    },
  };

  React.useEffect(() => {
    if (reserveBikeSuccess) {
      resetForm();
    }
  }, [reserveBikeSuccess]);

  return {
    bikeToReserve,
    bikes: bikes?.map(formatData) || [],
    formVisible,
    columns: [...columns, actionColumn],
    toggleForm,
    onSearch: handleFilteredSearch,
    onSearchReset: handleSearchReset,
    onReservationSubmit: handleReservationSubmit,
    onCancelReservationForm: resetForm,
  };
};
export default useMemberBikesWidget;
