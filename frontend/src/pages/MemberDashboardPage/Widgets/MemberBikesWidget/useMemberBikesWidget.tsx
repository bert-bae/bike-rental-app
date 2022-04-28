import React from "react";
import * as dateFns from "date-fns";
import debounce from "lodash.debounce";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { BikeFilters } from "../../../../components/DataTable/EntityFilters/BikeTableFilters";
import { MapMarkerType } from "../../../../components/MapWrapper";
import { useGetReservableBikesQuery } from "../../../../services/hooks/bikes";
import { useCreateReservationMutation } from "../../../../services/hooks/reservations";
import {
  TBikeLotsModel,
  TBikeModel,
  TReservationModel,
} from "../../../../types/entities.type";

const columns = [
  { key: "model", label: "Model" },
  { key: "color", label: "Color" },
  {
    key: "location",
    label: "Location",
    render: (location: TBikeLotsModel, row: any) => {
      const address = location?.address || {};
      return (
        <Box>
          <Typography variant="body1">{location?.lotName}</Typography>
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
    key: "rating",
    label: "Rating",
    render: (rating: string, row: any) => {
      if (!rating) {
        return 0;
      }

      return Math.round(Number(rating));
    },
  },
  {
    key: "available",
    label: "Available",
    render: (available: boolean) => {
      return available ? (
        <Chip label="Available" color="success" variant="outlined" />
      ) : (
        <Chip label="Not Available" color="warning" variant="outlined" />
      );
    },
  },
];

const useMemberBikesWidget = () => {
  const { mutate: reserveBike, isSuccess: reserveBikeSuccess } =
    useCreateReservationMutation();
  const [filters, setFilters] = React.useState<BikeFilters>({
    availableFrom: dateFns.addMinutes(new Date(), 1).toISOString(),
  });
  const { data: bikes } = useGetReservableBikesQuery(filters);
  const [formVisible, setFormVisible] = React.useState(false);
  const [bikeToReserve, setBikeToReserve] = React.useState<TBikeModel>();
  const toggleForm = (force: boolean) => {
    force ?? false ? setFormVisible((prev) => !prev) : setFormVisible(force);
  };

  const createBikeLotMarkers = React.useCallback((): MapMarkerType[] => {
    const lotMap: Record<string, MapMarkerType> = {};
    bikes?.forEach((bike) => {
      const bikeLot = bike.location as TBikeLotsModel;
      if (!lotMap[bikeLot.id]) {
        const [lat, lng] = bikeLot.geom.coordinates;
        lotMap[bikeLot.id] = {
          meta: {
            lotName: bikeLot.lotName,
            address: bikeLot.address,
          },
          lat: Number(lat),
          lng: Number(lng),
        };
      }
    });
    return Object.values(lotMap);
  }, [bikes]);

  const handleShowReservationForm = (bike: TBikeModel) => {
    setBikeToReserve(bike);
    toggleForm(true);
  };

  const handleReservationSubmit = (
    reservation: Pick<TReservationModel, "startTime" | "endTime">
  ) => {
    reserveBike({ ...reservation, bikeId: bikeToReserve?.id });
  };

  const handleMapLocationChange = (lat: number, lng: number) => {
    setFilters((prev) => ({ ...prev, lat: String(lat), lng: String(lng) }));
  };

  const debounceLocationChange = React.useRef(
    debounce(handleMapLocationChange, 500)
  ).current;

  const resetForm = React.useCallback(() => {
    toggleForm(false);
    setBikeToReserve(undefined);
  }, [setBikeToReserve]);

  const handleFilteredSearch = (filters: BikeFilters) => {
    setFilters((prev) => ({ ...prev, ...filters }));
  };

  const handleSearchReset = () => {
    setFilters((prev) => ({
      lat: prev.lat,
      lng: prev.lng,
      availableFrom: prev.availableFrom,
    }));
  };

  const actionColumn = {
    key: "actions",
    label: "Actions",
    render: (value: any, row: TBikeModel) => {
      return (
        <Button
          key={`reserve:${row.id}`}
          type="button"
          variant="outlined"
          style={{ margin: "5px" }}
          onClick={() => handleShowReservationForm(row)}
        >
          Reserve
        </Button>
      );
    },
  };

  React.useEffect(() => {
    if (reserveBikeSuccess) {
      resetForm();
    }
  }, [reserveBikeSuccess, resetForm]);

  return {
    bikeToReserve,
    bikeLotMarkers: createBikeLotMarkers(),
    bikes: bikes || [],
    formVisible,
    columns: [...columns, actionColumn],
    toggleForm,
    onLocationChange: debounceLocationChange,
    onSearch: handleFilteredSearch,
    onSearchReset: handleSearchReset,
    onReservationSubmit: handleReservationSubmit,
    onCancelReservationForm: resetForm,
  };
};
export default useMemberBikesWidget;
