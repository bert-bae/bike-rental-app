import { AxiosResponse } from "axios";
import { TBikeModel, TReservationModel } from "../../../types/entities.type";
import client from "../baseClient";
/* eslint-disable */

type TReservations = {
  bike: TBikeModel;
} & TReservationModel;

const read = async (input: {
  headers: { Authorization: string };
}): Promise<Array<TReservations>> => {
  const reservations: AxiosResponse<Array<TReservations>> = await client.get(
    "/admin/reservations",
    {
      headers: input.headers,
    }
  );
  return reservations.data;
};

export default {
  read,
};
