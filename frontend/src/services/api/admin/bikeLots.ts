import { AxiosResponse } from "axios";
import { TBikeLotsModel } from "../../../types/entities.type";
import client from "../baseClient";
/* eslint-disable */

const read = async (input: {
  headers: { Authorization: string };
}): Promise<Array<TBikeLotsModel>> => {
  const bikes: AxiosResponse<Array<TBikeLotsModel>> = await client.get(
    `/admin/bikelots`,
    {
      headers: input.headers,
    }
  );
  return bikes.data;
};

export default {
  read,
};
