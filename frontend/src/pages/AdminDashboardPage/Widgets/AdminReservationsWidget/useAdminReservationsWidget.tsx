import * as dateFns from "date-fns";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useGetAllReservations } from "../../../../services/hooks/reservations";
import {
  ReservationStatusEnum,
  TBikeLotsModel,
  TBikeModel,
  TUserModel,
} from "../../../../types/entities.type";

const columns = [
  {
    id: "user:username",
    key: "user",
    label: "Username",
    render: (user: TUserModel, row: any) => {
      return user?.username;
    },
  },
  {
    id: "user:name",
    key: "user",
    label: "Name",
    render: (user: TUserModel, row: any) => {
      return user?.name;
    },
  },
  {
    id: "bike:model",
    key: "bike",
    label: "Model",
    render: (bike: TBikeModel) => {
      return bike?.model;
    },
  },
  {
    id: "bike:color",
    key: "bike",
    label: "Color",
    render: (bike: TBikeModel) => {
      return bike?.color;
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
  {
    id: "bike:location",
    key: "bike",
    label: "Location",
    render: (bike: TBikeModel & { location: TBikeLotsModel }, row: any) => {
      const address = bike.location.address;
      return (
        <Box>
          <Typography variant="body1">{bike.location.lotName}</Typography>
          <Typography variant="subtitle2">
            {address.street}, {address.city}
          </Typography>
          <Typography variant="subtitle2">
            {address.province}, {address.postalCode}, {address.country}
          </Typography>
        </Box>
      );
    },
  },
  {
    key: "status",
    label: "Status",
    render: (value: string, row: any) => {
      if (value === ReservationStatusEnum.Cancelled) {
        <Chip label="Cancelled" color="warning" variant="outlined" />;
      }

      const startDate = new Date(row.startTime);
      const endDate = new Date(row.endTime);
      const now = new Date().getTime();

      const ongoing = now < endDate.getTime() && startDate.getTime() < now;
      if (ongoing) {
        return <Chip label="Active" color="success" variant="outlined" />;
      }

      const completed = now > endDate.setHours(endDate.getHours() - 1);
      if (completed) {
        return <Chip label="Complete" color="info" variant="outlined" />;
      }

      return <Chip label="Pending" color="primary" variant="outlined" />;
    },
  },
];

const useMemberReservationsWidget = () => {
  const { data: reservations } = useGetAllReservations();
  return {
    reservations: reservations || [],
    columns: columns,
  };
};
export default useMemberReservationsWidget;
