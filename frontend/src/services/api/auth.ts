import { UserRoleEnum } from "../../types/entities.type";
import client from "./baseClient";
/* eslint-disable */

export type LoginResponse = {
  role: UserRoleEnum;
  token: string;
};

const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const loggedIn: LoginResponse = await client.post("/users/login", {
    username,
    password,
  });
  return loggedIn;
};

export default {
  login,
};
