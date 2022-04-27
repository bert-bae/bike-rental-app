import React from "react";
import * as dateFns from "date-fns";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MultiSelect from "../../../../components/MultiSelect";
import DatePicker from "../../../../components/DatePicker";
import { modelList, colorList, ratingList } from "../../../../constants";

export type BikeFilters = {
  model?: string[];
  color?: string[];
  rating?: string[];
  availableFrom?: string;
  availableTo?: string;
  lat?: string;
  lng?: string;
};

type BikeTableFiltersProps = {
  dateSearchable?: boolean;
  onSearch: (filters: any) => void;
  onReset?: () => void;
};

const BikeTableFilters: React.FC<BikeTableFiltersProps> = ({
  dateSearchable,
  onSearch,
  onReset,
}) => {
  const getDefaultSelectedDate = React.useCallback(
    () => (dateSearchable ? dateFns.addMinutes(new Date(), 1) : null),
    [dateSearchable]
  );

  const [colors, setColors] = React.useState<string[]>([]);
  const [models, setModels] = React.useState<string[]>([]);
  const [rating, setRating] = React.useState<any>(null);
  const [availableFrom, setAvailableFrom] = React.useState<any>(
    getDefaultSelectedDate()
  );

  const reset = () => {
    setColors([]);
    setModels([]);
    setRating(null);
    setAvailableFrom(getDefaultSelectedDate());

    if (onReset) {
      onReset();
    }
  };

  return (
    <Box>
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
          value={rating as number}
          onChange={(e: any) => {
            e.preventDefault();
            setRating(e.target.value);
          }}
        >
          {ratingList.map((rating) => {
            return (
              <MenuItem key={rating.label} value={rating.value}>
                {rating.label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      {dateSearchable && (
        <Box>
          <FormControl sx={{ m: 1 }}>
            <DatePicker
              value={availableFrom}
              onChange={setAvailableFrom}
              allowSameDateSelection
              label="Availability"
              inputFormat="Pp"
              minDateTime={new Date()}
            />
          </FormControl>
        </Box>
      )}
      <Box display="flex" justifyContent="flex-end" sx={{ mt: 2, mb: 2 }}>
        <Button
          type="button"
          variant="outlined"
          onClick={() => {
            onSearch({
              color: colors,
              model: models,
              rating,
              availableFrom: availableFrom?.toISOString() || null,
            });
          }}
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
