import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MultiSelect from "../../../../components/MultiSelect";
import { modelList, colorList, ratingList } from "../../../../constants";
import { Button, FormControl } from "@mui/material";

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
  const [ratings, setRatings] = React.useState<string[]>([]);

  const reset = () => {
    setColors([]);
    setModels([]);
    setRatings([]);

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
      <MultiSelect
        selectedItems={ratings}
        label="Ratings"
        items={ratingList}
        onSelectChange={setRatings}
        onReset={() => setRatings([])}
      />
      <Box display="flex" justifyContent="flex-end">
        <Button
          type="button"
          variant="outlined"
          onClick={() =>
            onSearch({ color: colors, model: models, rating: ratings })
          }
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
