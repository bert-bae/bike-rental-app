import React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  DateTimePicker,
  DateTimePickerProps,
} from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

type ExtendedDatePickerProps = Omit<
  DateTimePickerProps,
  "views" | "renderInput"
>;

const DatePicker: React.FC<ExtendedDatePickerProps> = (props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        {...props}
        renderInput={(params) => <TextField {...params} />}
        views={["day", "hours", "minutes"]}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
