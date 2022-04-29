import { AxiosResponse } from "axios";
import { TBikeModel } from "../../types/entities.type";
import client from "./baseClient";
import { queryStringConstructor } from "./helpers/queryStrings";
/* eslint-disable */

const read = async (input: {
  filters: Record<string, any>;
  headers: { Authorization: string };
}): Promise<Array<TBikeModel>> => {
  const searchParams = queryStringConstructor(input.filters);
  const bikes: AxiosResponse<Array<TBikeModel>> = await client.get(
    `/bikes?${searchParams}`,
    {
      headers: input.headers,
    }
  );
  return bikes.data;
};

const readById = async (input: {
  id: string;
  headers: { Authorization: string };
}): Promise<TBikeModel> => {
  const bikes: AxiosResponse<TBikeModel> = await client.get(
    `/bikes/${input.id}`,
    {
      headers: input.headers,
    }
  );
  return bikes.data;
};

export default {
  read,
  readById,
};
