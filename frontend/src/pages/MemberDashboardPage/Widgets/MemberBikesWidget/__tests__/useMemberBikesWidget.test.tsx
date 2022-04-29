import useMemberBikesWidget from "../useMemberBikesWidget";
import { renderHookTest } from "../../../../../testUtils";

import bikesApi from "../../../../../services/api/bikes";

jest.mock("../../../../../services/api/bikes");

const mockBikeData = {
  id: "123",
  bikeLotId: "bikeLotId",
  model: "Mountain",
  color: "Red",
  rating: 5,
  available: true,
  location: {
    address: {
      city: "Vancouver",
      street: "Fun street",
    },
    geom: {
      coordinates: [0, 1],
    },
  },
  reservations: [],
};

describe("useMemberBikesWidget", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("[Instantiation]", () => {
    it("should render hook with initial state", async () => {
      const { result } = await renderHookTest(useMemberBikesWidget);

      const state = result.current;
      expect(state).toEqual({
        bikeToReserve: undefined,
        bikeLotMarkers: expect.any(Array),
        bikes: [],
        formVisible: false,
        columns: expect.any(Array),
        toggleForm: expect.any(Function),
        onLocationChange: expect.any(Function),
        onSearch: expect.any(Function),
        onSearchReset: expect.any(Function),
        onReservationSubmit: expect.any(Function),
        onCancelReservationForm: expect.any(Function),
      });
    });

    it("should render hook with initial query result", async () => {
      (bikesApi.read as any).mockResolvedValue([mockBikeData]);
      const { result, waitFor } = await renderHookTest(useMemberBikesWidget);

      await waitFor(() => {
        return result.current.bikes.length > 0;
      });

      const state = result.current;
      expect(state).toEqual({
        bikeToReserve: undefined,
        bikeLotMarkers: expect.any(Array),
        bikes: [mockBikeData],
        formVisible: false,
        columns: expect.any(Array),
        toggleForm: expect.any(Function),
        onLocationChange: expect.any(Function),
        onSearch: expect.any(Function),
        onSearchReset: expect.any(Function),
        onReservationSubmit: expect.any(Function),
        onCancelReservationForm: expect.any(Function),
      });
    });
  });

  describe("[Actions]", () => {
    describe("onSearch", () => {
      const mockFilter = {
        model: ["Mountain"],
        color: ["Blue"],
        availableFrom: new Date().toISOString(),
        lat: 40,
        lng: 100,
      };
      it("should trigger query with updated filters", async () => {
        (bikesApi.read as any).mockResolvedValueOnce([]);

        const { result, waitFor } = await renderHookTest(useMemberBikesWidget);

        (bikesApi.read as any).mockResolvedValueOnce([mockBikeData]);
        result.current.onSearch(mockFilter);
        await waitFor(() => {
          return result.current.bikes.length > 0;
        });

        expect(bikesApi.read).toHaveBeenCalledTimes(2); // once on load
        expect(bikesApi.read).toHaveBeenCalledWith({
          filters: mockFilter,
          headers: {
            Authorization: "",
          },
        }); // once on load
      });
    });
  });
});
