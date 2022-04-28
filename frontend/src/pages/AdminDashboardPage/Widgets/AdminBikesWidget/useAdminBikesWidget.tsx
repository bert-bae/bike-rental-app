import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import {
  useCreateBikeMutation,
  useDeleteBikeMutation,
  useEditBikeMutation,
  useGetBikesQuery,
} from "../../../../services/hooks/bikes";
import { useGetBikeLotsQuery } from "../../../../services/hooks/bikeLots";
import { TBikeLotsModel, TBikeModel } from "../../../../types/entities.type";
import { BikeFilters } from "../../../../components/DataTable/EntityFilters/BikeTableFilters";

const columns = [
  { key: "model", label: "Model" },
  { key: "color", label: "Color" },
  {
    key: "location",
    label: "Location",
    render: (location: TBikeLotsModel, row: any) => {
      const address = location?.address;
      return (
        <Box>
          <Typography variant="body1">{location?.lotName}</Typography>
          <Typography variant="subtitle2">
            {address?.street}, {address?.city}
          </Typography>
          <Typography variant="subtitle2">
            {address?.province}, {address?.postalCode}, {address?.country}
          </Typography>
        </Box>
      );
    },
  },
  {
    key: "rating",
    label: "Rating",
    render: (rating: string, row: any) => {
      return Math.round(Number(rating));
    },
  },
  {
    key: "available",
    label: "Available",
    render: (available: boolean) => {
      return available ? (
        <Chip label="Available" color="success" variant="outlined" />
      ) : (
        <Chip label="Not Available" color="warning" variant="outlined" />
      );
    },
  },
];

const useAdminBikesWidget = () => {
  const [bikeToEdit, setBikeToEdit] = React.useState<TBikeModel | void>();
  const [filters, setFilters] = React.useState<BikeFilters>();
  const { data: bikes } = useGetBikesQuery(filters);
  const { data: bikeLots } = useGetBikeLotsQuery();
  const { mutate: createBike, isSuccess: createSuccess } =
    useCreateBikeMutation();
  const { mutate: editBike, isSuccess: editSuccess } = useEditBikeMutation();
  const { mutate: deleteBike, isSuccess: deleteSuccess } =
    useDeleteBikeMutation();
  const [formVisible, setFormVisible] = React.useState(false);

  const toggleForm = (force: boolean) => {
    force ?? false ? setFormVisible((prev) => !prev) : setFormVisible(force);
  };

  const handleShowEditBike = (bike: TBikeModel) => {
    setBikeToEdit(bike);
    toggleForm(true);
  };

  const handleBikeFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      model: formData.get("model"),
      color: formData.get("color"),
      bikeLotId: formData.get("bikeLotId"),
      available: formData.get("available") === "on",
    };

    const id = formData.get("id");
    if (id) {
      editBike({ ...data, id });
    } else {
      createBike(data);
    }
  };

  const handleBikeDelete = (bike: TBikeModel) => {
    deleteBike(bike.id);
  };

  const handleFilteredSearch = (filters: BikeFilters) => {
    setFilters(filters);
  };

  const handleSearchReset = () => {
    setFilters(undefined);
  };

  const resetForm = React.useCallback(() => {
    toggleForm(false);
    setBikeToEdit(undefined);
  }, [setBikeToEdit]);

  const actionColumn = {
    key: "actions",
    label: "Actions",
    render: (value: any, row: TBikeModel) => {
      return (
        <Box>
          <Button
            key={`edit:${row.id}`}
            type="button"
            variant="outlined"
            style={{ margin: "5px" }}
            onClick={() => handleShowEditBike(row)}
          >
            Edit
          </Button>
          <Button
            key={`delete:${row.id}`}
            type="button"
            variant="outlined"
            style={{ margin: "5px" }}
            onClick={() => handleBikeDelete(row)}
          >
            Delete
          </Button>
        </Box>
      );
    },
  };

  useEffect(() => {
    if (createSuccess || editSuccess || deleteSuccess) {
      resetForm();
    }
  }, [createSuccess, editSuccess, deleteSuccess, resetForm]);

  return {
    bikeToEdit,
    bikes: bikes || [],
    bikeLots: bikeLots || [],
    formVisible,
    columns: [...columns, actionColumn],
    toggleForm,
    onSearch: handleFilteredSearch,
    onSearchReset: handleSearchReset,
    onBikeFormSubmit: handleBikeFormSubmit,
    onCancelBikeForm: resetForm,
  };
};
export default useAdminBikesWidget;
