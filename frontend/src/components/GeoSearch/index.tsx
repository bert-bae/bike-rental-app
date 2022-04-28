import React from "react";
import debounce from "lodash.debounce";
import Box from "@mui/material/Box";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import styled from "@emotion/styled";
import { geocodeClient } from "../../clients/mapbox";

type GeocodeSearchProps = {
  onSelect: (point: { lat: number; lng: number }) => void;
};

type ExtendedTextFieldSearchProps = GeocodeSearchProps &
  Omit<TextFieldProps, "type" | "value" | "onChange" | "onSelect">;

const StyledListContainer = styled(Box)({
  position: "absolute",
  left: 0,
  width: "100%",
  border: "1px solid grey",
  borderRadius: "4px",
  maxHeight: "300px",
  zIndex: 1000,
  backgroundColor: "#FFF",
  overflowY: "auto",
});

const StyledListItem = styled(Box)({
  width: "100%",
  padding: "12px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
  ":hover": {
    backgroundColor: "RGBA(205, 209, 228, 0.3)",
    transition: "all 0.05s ease-in",
  },
});

type ForwardGeocodeBody = {
  features: {
    geometry: {
      type: "Point";
      coordinates: [number, number];
    };
    place_name?: string;
    matching_place_name?: string;
  }[];
};

const GeoSearch: React.FC<ExtendedTextFieldSearchProps> = ({
  onSelect,
  ...textProps
}) => {
  const [input, setInput] = React.useState<string>("");
  const [listOpen, setListOpen] = React.useState<boolean>(false);
  const [searchResults, setSearchResults] = React.useState<
    {
      address?: string;
      lat: number;
      lng: number;
    }[]
  >([]);

  const handleClickAway = () => {
    setListOpen(false);
  };

  const debounceSearch = React.useCallback(
    debounce((value: string) => {
      geocodeClient
        .forwardGeocode({
          query: value,
        })
        .send()
        .then((data: { body: ForwardGeocodeBody }) => {
          const { body } = data;
          setListOpen(true);
          const searchResultsSanitized = body.features
            .map((feature) => {
              const address = feature.place_name || feature.matching_place_name;
              return {
                address,
                lng: feature.geometry.coordinates[0],
                lat: feature.geometry.coordinates[1],
              };
            })
            .filter((item) => item.address);
          setSearchResults(searchResultsSanitized);
        });
    }, 500),
    []
  );

  const handleChange = (e: any) => {
    const { value } = e.target;
    setInput(value);
    debounceSearch(value);
  };

  return (
    <Box position="relative" width="100%">
      <TextField
        type="text"
        fullWidth
        {...textProps}
        value={input}
        onChange={handleChange}
      />
      {listOpen && (
        <ClickAwayListener onClickAway={handleClickAway}>
          <StyledListContainer
            style={{
              bottom: `-${
                searchResults.length === 0
                  ? 100
                  : searchResults.length * 100 + searchResults.length * 10
              }%`,
            }}
          >
            {searchResults.length > 0 ? (
              <>
                {searchResults.map((item) => (
                  <StyledListItem
                    onClick={() => {
                      setListOpen(false);
                      setInput(item.address || "");
                      onSelect({ lat: item.lat, lng: item.lng });
                    }}
                  >
                    {item.address}
                  </StyledListItem>
                ))}
              </>
            ) : (
              <StyledListItem>No data</StyledListItem>
            )}
          </StyledListContainer>
        </ClickAwayListener>
      )}
    </Box>
  );
};

export default GeoSearch;
