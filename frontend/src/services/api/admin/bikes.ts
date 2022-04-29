import { AxiosResponse } from "axios";
import { BikeFilters } from "../../../components/DataTable/EntityFilters/BikeTableFilters";
import { TBikeModel } from "../../../types/entities.type";
import client from "../baseClient";
import { queryStringConstructor } from "../helpers/queryStrings";
/* eslint-disable */

const read = async (input: {
  body: TBikeModel;
  filters: BikeFilters;
  headers: { Authorization: string };
}): Promise<TBikeModel[]> => {
  const searchParams = queryStringConstructor(input.filters);
  const bikes: AxiosResponse<TBikeModel[]> = await client.get(
    `/admin/bikes?${searchParams}`,
    {
      headers: input.headers,
    }
  );
  return bikes.data;
};

const create = async (input: {
  body: TBikeModel;
  headers: { Authorization: string };
}): Promise<TBikeModel> => {
  const bike: AxiosResponse<TBikeModel> = await client.post(
    "/admin/bikes",
    input.body,
    {
      headers: input.headers,
    }
  );
  return bike.data;
};

const edit = async (input: {
  id: string;
  body: TBikeModel;
  headers: { Authorization: string };
}): Promise<void> => {
  await client.put(`/admin/bikes/${input.id}`, input.body, {
    headers: input.headers,
  });
};

const destroy = async (input: {
  id: string;
  headers: { Authorization: string };
}): Promise<void> => {
  await client.delete(`/admin/bikes/${input.id}`, {
    headers: input.headers,
  });
};

export default {
  read,
  create,
  edit,
  destroy,
};
