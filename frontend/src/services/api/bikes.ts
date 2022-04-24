import { AxiosResponse } from "axios";
import { TBikeModel } from "../../types/entities.type";
import client from "./baseClient";

const read = async (input: {
  headers: { Authorization: string };
}): Promise<Array<TBikeModel>> => {
  const bikes: AxiosResponse<Array<TBikeModel>> = await client.get("/bikes", {
    headers: input.headers,
  });
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

const create = async (input: {
  body: TBikeModel;
  headers: { Authorization: string };
}): Promise<TBikeModel> => {
  const bike: AxiosResponse<TBikeModel> = await client.post(
    "/bikes",
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
  await client.put(`/bikes/${input.id}`, input.body, {
    headers: input.headers,
  });
};

const destroy = async (input: {
  id: string;
  headers: { Authorization: string };
}): Promise<void> => {
  await client.delete(`/bikes/${input.id}`, {
    headers: input.headers,
  });
};

export default {
  read,
  readById,
  create,
  edit,
  destroy,
};