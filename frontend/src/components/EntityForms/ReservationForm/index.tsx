import React from "react";
import * as dateFns from "date-fns";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import DatePicker from "../../DatePicker";
import { useGetBikeQuery } from "../../../services/hooks/bikes";
import { TBikeModel, TReservationModel } from "../../../types/entities.type";

type ReservationFormProps = {
  bike: TBikeModel;
  onSubmit: (input: Pick<TReservationModel, "startTime" | "endTime">) => void;
  onCancel: () => void;
};

const UnavailableDateTime: React.FC<{
  startTime: Date;
  endTime: Date;
}> = ({ startTime, endTime }) => {
  const start = dateFns.format(startTime, "Pp");
  const end = dateFns.format(endTime, "Pp");
  console.log(start);
  console.log(end);
  return (
    <Box key={startTime.getTime().toString()} style={{ padding: "3px 0" }}>
      <Chip label={`${start} - ${end}`} color="error" />
    </Box>
  );
};

const ReservationForm: React.FC<ReservationFormProps> = ({
  bike,
  onSubmit,
  onCancel,
}) => {
  const { data } = useGetBikeQuery(bike?.id);
  const [unavailableTimes, setUnavailableTimes] = React.useState<
    { startTime: Date; endTime: Date }[]
  >([]);
  const [start, setStart] = React.useState<any>();
  const [end, setEnd] = React.useState<any>();

  const formatTime = (date: any) => {
    return dateFns.format(date, "Pp");
  };

  const validateTimeSelection = React.useCallback(() => {
    const unavailable = unavailableTimes.some(({ startTime, endTime }) => {
      const unavailStartMs = startTime.getTime();
      const pickedStartMs = start.getTime();
      const unavailEndMs = endTime.getTime();
      const pickedEndMs = end.getTime();

      if (unavailStartMs > pickedStartMs && unavailStartMs > pickedEndMs) {
        return true;
      }

      if (unavailEndMs < pickedStartMs && unavailEndMs > pickedEndMs) {
        return true;
      }
    });
    return !unavailable;
  }, [unavailableTimes, start, end]);

  React.useEffect(() => {
    const reservations = data?.reservations;
    if (!reservations?.length) {
      return;
    }

    const sanitizedReservationSlots = reservations.map((reservation) => {
      let endTime = new Date(reservation.endTime);
      endTime = dateFns.setHours(endTime, endTime.getHours() + 1);
      endTime = dateFns.setMinutes(endTime, 0);
      return {
        startTime: dateFns.setMinutes(new Date(reservation.startTime), 0),
        endTime,
      };
    });
    setUnavailableTimes(sanitizedReservationSlots);
  }, [data, setUnavailableTimes]);

  return (
    <Box
      style={{ padding: "20px", width: "500px" }}
      component="form"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateTimeSelection()) {
          alert("Cannot choose time");
          return;
        }
        onSubmit({
          startTime: start.toISOString(),
          endTime: end.toISOString(),
        });
      }}
      noValidate
      sx={{ mt: 1 }}
    >
      <Typography variant="h6">Create Reservation</Typography>
      {data ? (
        <>
          <Box style={{ padding: "20px 0" }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body1">
                <b>Model</b>
              </Typography>
              <Typography variant="body2">{data.model}</Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body1">
                <b>Color</b>
              </Typography>
              <Typography variant="body2">{data.color}</Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body1">
                <b>Rating</b>
              </Typography>
              <Typography variant="body2">{data.rating}</Typography>
            </Box>
          </Box>
          <FormControl fullWidth margin="normal">
            <DatePicker
              value={start ? formatTime(start) : null}
              onChange={setStart}
              allowSameDateSelection
              label="Start"
              inputFormat="Pp"
              minDateTime={new Date()}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <DatePicker
              value={end ? formatTime(end) : null}
              onChange={setEnd}
              allowSameDateSelection
              label="End"
              inputFormat="Pp"
              minDateTime={start}
            />
          </FormControl>
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
              Create
            </Button>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" style={{ marginBottom: "20px" }}>
              Unavailable Times
            </Typography>
            {unavailableTimes.length === 0 ? (
              <p>None</p>
            ) : (
              unavailableTimes.map(({ startTime, endTime }) => (
                <UnavailableDateTime startTime={startTime} endTime={endTime} />
              ))
            )}
          </Box>
        </>
      ) : (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default ReservationForm;
