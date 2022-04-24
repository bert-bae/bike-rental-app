import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { TBikeModel } from "../../../types/entities.type";

type BikeFormProps = {
  bike?: TBikeModel | void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
};

const BikeForm: React.FC<BikeFormProps> = ({ bike, onSubmit, onCancel }) => {
  return (
    <Box
      style={{ padding: "20px", width: "500px" }}
      component="form"
      onSubmit={onSubmit}
      noValidate
      sx={{ mt: 1 }}
    >
      <Typography variant="h6">{bike?.id ? "Edit" : "Create"} Bike</Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        name="id"
        type="text"
        style={{ display: "none" }}
        defaultValue={bike?.id}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Model"
        name="model"
        autoComplete="model"
        autoFocus
        defaultValue={bike?.model}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="color"
        label="Color"
        type="text"
        defaultValue={bike?.color}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="location"
        label="Location"
        type="text"
        defaultValue={bike?.location}
      />
      <Box display="flex" justifyContent="flex-end" alignItems="center">
        <Button
          type="button"
          variant="text"
          sx={{ mt: 3, mb: 2 }}
          style={{ marginRight: "8px" }}
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button type="submit" variant="outlined" sx={{ mt: 3, mb: 2 }}>
          {bike?.id ? "Edit" : "Create"}
        </Button>
      </Box>
    </Box>
  );
};

export default BikeForm;
