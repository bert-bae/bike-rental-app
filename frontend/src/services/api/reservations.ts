import { AxiosResponse } from "axios";
import { TBikeModel, TReservationModel } from "../../types/entities.type";
import client from "./baseClient";
/* eslint-disable */

type TReservations = {
  bike: TBikeModel;
} & TReservationModel;

const read = async (input: {
  headers: { Authorization: string };
}): Promise<Array<TReservations>> => {
  const reservations: AxiosResponse<Array<TReservations>> = await client.get(
    "/reservations",
    {
      headers: input.headers,
    }
  );
  return reservations.data;
};

const readById = async (input: {
  id: string;
  headers: { Authorization: string };
}): Promise<TReservationModel> => {
  const reservations: AxiosResponse<TReservationModel> = await client.get(
    `/reservations/${input.id}`,
    {
      headers: input.headers,
    }
  );
  return reservations.data;
};

const create = async (input: {
  body: Omit<TReservationModel, "userId" | "status">;
  headers: { Authorization: string };
}): Promise<TReservationModel> => {
  const reservation: AxiosResponse<TReservationModel> = await client.post(
    `/bikes/${input.body.bikeId}/reservations`,
    input.body,
    {
      headers: input.headers,
    }
  );
  return reservation.data;
};

const edit = async (input: {
  id: string;
  body: Omit<TReservationModel, "userId">;
  headers: { Authorization: string };
}): Promise<void> => {
  await client.put(
    `/bikes/${input.body.bikeId}/reservations/${input.id}`,
    input.body,
    {
      headers: input.headers,
    }
  );
};

export default {
  read,
  readById,
  create,
  edit,
};
