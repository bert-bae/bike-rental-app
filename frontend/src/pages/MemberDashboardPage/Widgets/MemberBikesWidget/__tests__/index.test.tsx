import MemberBikesWidget from "../";
import { renderComponent } from "../../../../../testUtils";
import { fireEvent, screen, waitFor } from "@testing-library/react";

import bikesApi from "../../../../../services/api/bikes";

jest.mock("../../../../../services/api/bikes");

// cannot run mapbox in test environment, mock the component
jest.mock("../../../../../components/MapWrapper", () => () => <></>);

describe("MemberBikesWidget", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("[Rendering]", () => {
    it("Should render widget with expected title", async () => {
      await renderComponent(<MemberBikesWidget />);

      expect(screen.getByTestId("memberBikesWidget")).toBeInTheDocument();
      expect(screen.getByText("Bikes")).toBeInTheDocument();
    });

    it("Should render with bikes in data if query returns results", async () => {
      (bikesApi.read as any).mockResolvedValue([
        {
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
        },
      ]);
      await renderComponent(<MemberBikesWidget />);

      await waitFor(() => {
        return screen.findByTestId(`bike:123`);
      });
      expect(screen.getByText("Mountain")).toBeInTheDocument();
      expect(screen.getByText("Red")).toBeInTheDocument();
      expect(screen.getByText("Fun street, Vancouver")).toBeInTheDocument();
      expect(screen.getByText("5")).toBeInTheDocument();
    });
  });

  describe("[Actions]", () => {
    describe("Filter", () => {
      it("should call bike search API with filers", async () => {
        (bikesApi.read as any).mockResolvedValueOnce([]);
        await renderComponent(<MemberBikesWidget />);

        expect(bikesApi.read as any).toHaveBeenCalledTimes(1);
        expect(await screen.queryByTestId(`bike:123`)).not.toBeInTheDocument();
        (bikesApi.read as any).mockResolvedValueOnce([
          {
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
          },
        ]);
        const filterBtn = screen.getByTestId("bikeSearchBtn");
        await waitFor(() => fireEvent.click(filterBtn));

        expect(bikesApi.read).toHaveBeenCalledTimes(2);
        expect(bikesApi.read).toHaveBeenCalledWith({
          filters: {
            availableFrom: expect.any(String),
            color: expect.any(Array),
            model: expect.any(Array),
            rating: null,
          },
          headers: {
            Authorization: "",
          },
        });

        await waitFor(() => {
          return screen.findByTestId(`bike:123`);
        });
        expect(screen.getByText("Mountain")).toBeInTheDocument();
        expect(screen.getByText("Red")).toBeInTheDocument();
        expect(screen.getByText("Fun street, Vancouver")).toBeInTheDocument();
        expect(screen.getByText("5")).toBeInTheDocument();
      });
    });
  });
});
