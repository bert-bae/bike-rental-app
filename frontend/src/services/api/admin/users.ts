import { AxiosResponse } from "axios";
import { TUserModel } from "../../../types/entities.type";
import client from "../baseClient";
/* eslint-disable */

const read = async (input: {
  headers: { Authorization: string };
}): Promise<Array<TUserModel>> => {
  const users: AxiosResponse<Array<TUserModel>> = await client.get(
    "/admin/users",
    {
      headers: input.headers,
    }
  );
  return users.data;
};

const edit = async (input: {
  id: string;
  body: TUserModel;
  headers: { Authorization: string };
}): Promise<void> => {
  await client.put(`/admin/users/${input.id}`, input.body, {
    headers: input.headers,
  });
};

const destroy = async (input: {
  id: string;
  headers: { Authorization: string };
}): Promise<void> => {
  await client.delete(`/admin/users/${input.id}`, {
    headers: input.headers,
  });
};

export default {
  read,
  edit,
  destroy,
};
