import React, { useEffect } from "react";
import {
  useCreateBikeMutation,
  useDeleteBikeMutation,
  useEditBikeMutation,
  useGetBikesQuery,
} from "../../../../services/hooks/bikes";
import { TBikeModel } from "../../../../types/entities.type";

const useAdminBikesWidget = () => {
  const [bikeToEdit, setBikeToEdit] = React.useState<TBikeModel | void>();
  const { data: bikes } = useGetBikesQuery();
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

  const resetForm = () => {
    toggleForm(false);
    setBikeToEdit(undefined);
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
    toggleForm,
    onShowBikeEditForm: handleShowEditBike,
    onBikeFormSubmit: handleBikeFormSubmit,
    onDeleteBike: handleBikeDelete,
    onCancelBikeForm: resetForm,
  };
};
export default useAdminBikesWidget;
