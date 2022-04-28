import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export type AdminReservationFilters = {
  q?: string;
};

type AdminReservationTableFiltersProps = {
  onSearch: (val: string) => void;
  onReset?: () => void;
};

const AdminReservationTableFilters: React.FC<
  AdminReservationTableFiltersProps
> = ({ onSearch, onReset }) => {
  const [q, setQ] = React.useState<string>("");

  const reset = () => {
    setQ("");

    if (onReset) {
      onReset();
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box display="flex" justifyContent="flex-end" alignItems="center">
        <Box>
          <TextField
            sx={{ m: 1 }}
            margin="normal"
            placeholder="Search by username or name"
            type="text"
            value={q}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.preventDefault();
              setQ(e.target.value);
            }}
          />
        </Box>

        <Box>
          <Button
            type="button"
            variant="outlined"
            onClick={() => {
              onSearch(q);
            }}
            sx={{ m: 1 }}
          >
            Search
          </Button>
          <Button type="button" onClick={reset} sx={{ m: 1 }}>
            Reset
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminReservationTableFilters;
