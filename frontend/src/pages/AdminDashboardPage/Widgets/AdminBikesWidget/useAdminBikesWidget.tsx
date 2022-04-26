import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  useCreateBikeMutation,
  useDeleteBikeMutation,
  useEditBikeMutation,
  useGetBikesQuery,
} from "../../../../services/hooks/bikes";
import { TBikeModel } from "../../../../types/entities.type";
import { BikeFilters } from "../../../../components/DataTable/EntityFilters/BikeTableFilters";
import ReviewStars from "../../../../components/ReviewStars";

const columns = [
  { key: "model", label: "Model" },
  { key: "color", label: "Color" },
  { key: "location", label: "Location" },
  {
    key: "rating",
    label: "Rating",
    render: (rating: string, row: any) => {
      return (
        <ReviewStars
          size={16}
          value={rating ? Math.round(Number(rating)) : 0}
          readonly={true}
        />
      );
    },
  },
  {
    key: "available",
    label: "Available",
    render: (bike: TBikeModel) => {
      return "Yes";
    },
  },
];

const useAdminBikesWidget = () => {
  const [bikeToEdit, setBikeToEdit] = React.useState<TBikeModel | void>();
  const [filters, setFilters] = React.useState<BikeFilters>();
  const { data: bikes } = useGetBikesQuery(filters);
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
      location: formData.get("location"),
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

  const resetForm = () => {
    toggleForm(false);
    setBikeToEdit(undefined);
  };

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
  }, [createSuccess, editSuccess, deleteSuccess]);

  return {
    bikeToEdit,
    bikes: bikes || [],
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
