import { AxiosResponse } from "axios";
import { TUserModel } from "../../types/entities.type";
import client from "./baseClient";
/* eslint-disable */

const readById = async (input: {
  id: string;
  headers: { Authorization: string };
}): Promise<TUserModel> => {
  const users: AxiosResponse<TUserModel> = await client.get(
    `/users/${input.id}`,
    {
      headers: input.headers,
    }
  );
  return users.data;
};

const create = async (input: {
  body: TUserModel;
  headers: { Authorization: string };
}): Promise<TUserModel> => {
  const user: AxiosResponse<TUserModel> = await client.post(
    "/users",
    input.body,
    {
      headers: input.headers,
    }
  );
  return user.data;
};

export default {
  readById,
  create,
};
