import * as React from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type MultiSelectProps = {
  label: string;
  selectedItems: any[];
  items: { label: string; value: any }[];
  width?: number;
  onSelectChange: (values: string[]) => void;
  onReset?: () => void;
};

const MultiSelect: React.FC<MultiSelectProps> = ({
  selectedItems,
  label,
  items,
  width,
  onSelectChange,
  onReset,
}) => {
  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    onSelectChange(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const reset = () => {
    onReset && onReset();
  };

  return (
    <FormControl sx={{ m: 1, width: width || 300 }}>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        value={selectedItems}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
      >
        {items.map(({ label, value }) => (
          <MenuItem key={label} value={value}>
            <Checkbox checked={selectedItems.indexOf(value) > -1} />
            <ListItemText primary={label} />
          </MenuItem>
        ))}
        {onReset && (
          <Box display="flex" justifyContent="flex-end">
            <Button sx={{ mr: 2 }} onClick={reset}>
              Reset
            </Button>
          </Box>
        )}
      </Select>
    </FormControl>
  );
};

export default MultiSelect;
