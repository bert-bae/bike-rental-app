import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MultiSelect from "../../../../components/MultiSelect";
import { modelList, colorList, ratingList } from "../../../../constants";

export type BikeFilters = {
  model: string[];
  color: string[];
  rating: string[];
};

type BikeTableFiltersProps = {
  onSearch: (filters: any) => void;
  onReset?: () => void;
};

const BikeTableFilters: React.FC<BikeTableFiltersProps> = ({
  onSearch,
  onReset,
}) => {
  const [colors, setColors] = React.useState<string[]>([]);
  const [models, setModels] = React.useState<string[]>([]);
  const [rating, setRating] = React.useState<number>(1);

  const reset = () => {
    setColors([]);
    setModels([]);
    setRating(1);

    if (onReset) {
      onReset();
    }
  };

  return (
    <Box>
      <FormControl sx={{ m: 1 }}>
        <TextField label="Location" type="text" />
      </FormControl>
      <MultiSelect
        selectedItems={models}
        label="Models"
        items={modelList}
        onSelectChange={setModels}
        onReset={() => setModels([])}
      />
      <MultiSelect
        selectedItems={colors}
        label="Colors"
        items={colorList}
        onSelectChange={setColors}
        onReset={() => setColors([])}
      />
      <FormControl sx={{ m: 1, width: 150 }}>
        <InputLabel>Rating</InputLabel>
        <Select
          label="Rating"
          onChange={(e: any) => {
            e.preventDefault();
            setRating(e.target.value);
          }}
        >
          {ratingList.map((rating) => {
            return <MenuItem value={rating.value}>{rating.label}</MenuItem>;
          })}
        </Select>
      </FormControl>
      <Box display="flex" justifyContent="flex-end" sx={{ mt: 2, mb: 2 }}>
        <Button
          type="button"
          variant="outlined"
          onClick={() => onSearch({ color: colors, model: models, rating })}
          sx={{ m: 1 }}
        >
          Filter
        </Button>
        <Button type="button" onClick={reset} sx={{ m: 1 }}>
          Reset
        </Button>
      </Box>
    </Box>
  );
};

export default BikeTableFilters;
