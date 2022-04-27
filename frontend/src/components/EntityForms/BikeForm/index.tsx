import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";

import Box from "@mui/material/Box";
import { TBikeLotsModel, TBikeModel } from "../../../types/entities.type";
import { modelList, colorList } from "../../../constants";

type BikeFormProps = {
  bike?: TBikeModel | void;
  bikeLots?: TBikeLotsModel[] | void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
};

const BikeForm: React.FC<BikeFormProps> = ({
  bike,
  bikeLots,
  onSubmit,
  onCancel,
}) => {
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
      <FormControl sx={{ m: 1 }} fullWidth>
        <InputLabel>Models</InputLabel>
        <Select
          label="Model"
          name="model"
          autoFocus
          defaultValue={bike?.model}
          required
        >
          {modelList.map((model) => {
            return <MenuItem value={model.value}>{model.label}</MenuItem>;
          })}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1 }} fullWidth>
        <InputLabel>Color</InputLabel>
        <Select label="Color" name="color" defaultValue={bike?.color} required>
          {colorList.map((color) => {
            return <MenuItem value={color.value}>{color.label}</MenuItem>;
          })}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1 }} fullWidth>
        <InputLabel>Bike Location</InputLabel>
        <Select
          label="Bike Location"
          name="bikeLotId"
          defaultValue={bike?.location?.id}
          required
        >
          {bikeLots?.map((lot) => {
            return <MenuItem value={lot.id}>{lot.lotName}</MenuItem>;
          })}
        </Select>
      </FormControl>
      <FormControlLabel
        sx={{ m: 1 }}
        label="Available"
        control={
          <Checkbox
            aria-label="Available"
            name="available"
            defaultChecked={bike?.available}
          />
        }
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
