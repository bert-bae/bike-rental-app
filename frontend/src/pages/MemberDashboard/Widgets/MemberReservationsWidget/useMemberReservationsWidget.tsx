import * as dateFns from "date-fns";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  useUpdateReservationMutation,
  useGetReservations,
} from "../../../../services/hooks/reservations";
import {
  ReservationStatusEnum,
  TBikeModel,
  TReservationModel,
} from "../../../../types/entities.type";

const columns = [
  {
    key: "bike",
    label: "Model",
    render: (bike: TBikeModel) => {
      return bike.model;
    },
  },
  {
    key: "bike",
    label: "Color",
    render: (bike: TBikeModel) => {
      return bike.color;
    },
  },
  {
    key: "bike",
    label: "Location",
    render: (bike: TBikeModel) => {
      return bike.location;
    },
  },
  {
    key: "startTime",
    label: "Start Time",
    render: (value: string) => {
      if (!value) {
        return;
      }

      const date = new Date(value);
      return dateFns.format(date, "Pp");
    },
  },
  {
    key: "endTime",
    label: "End Time",
    render: (value: string) => {
      if (!value) {
        return;
      }

      const date = new Date(value);
      return dateFns.format(date, "Pp");
    },
  },
  { key: "status", label: "Status" },
];

const useMemberReservationsWidget = () => {
  const { data: reservations } = useGetReservations();
  const { mutate: updateReservation } = useUpdateReservationMutation();

  const cancelReservation = (reservation: TReservationModel) => {
    updateReservation({
      id: reservation.id,
      reservation: { status: ReservationStatusEnum.Cancelled },
    });
  };

  const actionColumn = {
    key: "actions",
    label: "Actions",
    render: (value: any, row: TReservationModel): React.ReactElement => {
      if (row.status === ReservationStatusEnum.Cancelled) {
        return <Box> - </Box>;
      }
      return (
        <Button
          key={`cancelReservation:${row.id}`}
          type="button"
          variant="outlined"
          style={{ margin: "5px" }}
          onClick={() => cancelReservation(row)}
        >
          Cancel
        </Button>
      );
    },
  };

  return {
    reservations: reservations || [],
    columns: [...columns, actionColumn],
    onCancelReservation: cancelReservation,
  };
};
export default useMemberReservationsWidget;
