import { AxiosResponse } from "axios";
import { TUserModel } from "../../types/entities.type";
import client from "./baseClient";

const read = async (input: {
  headers: { Authorization: string };
}): Promise<Array<TUserModel>> => {
  const users: AxiosResponse<Array<TUserModel>> = await client.get("/users", {
    headers: input.headers,
  });
  return users.data;
};

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

const edit = async (input: {
  id: string;
  body: TUserModel;
  headers: { Authorization: string };
}): Promise<void> => {
  await client.put(`/users/${input.id}`, input.body, {
    headers: input.headers,
  });
};

const destroy = async (input: {
  id: string;
  headers: { Authorization: string };
}): Promise<void> => {
  await client.delete(`/users/${input.id}`, {
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
