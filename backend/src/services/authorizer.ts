import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UsersModel } from "../models/";
import { TUserModel, UserRoleEnum } from "../models/model.type";
import { Authorizer } from "./services.type";

export class AuthService extends Authorizer {
  private model: typeof UsersModel;

  constructor() {
    super();
    this.model = UsersModel;
  }

  public async login(
    username: string,
    password: string
  ): Promise<{
    jwt: string;
    role: UserRoleEnum;
    userId: string;
    username: string;
  }> {
    const user = await this.model.findOne({ where: { username } });
    if (!user) {
      throw new Error(`User with username ${username} does not exist`);
    }

    const compare = await bcrypt.compare(password, user.password);
    if (!compare) {
      throw new Error(`Incorrect password`);
    }

    const jwtSecretKey = <string>process.env.JWT_SECRET_KEY;
    const token = jwt.sign(
      {
        // time: Date(),
        userId: user.id,
      },
      jwtSecretKey
    );

    return {
      jwt: `Bearer ${token}`,
      role: user.role,
      userId: user.id,
      username: user.username,
    };
  }

  public async authorize(token: string): Promise<TUserModel | null> {
    const jwtSecretKey = <string>process.env.JWT_SECRET_KEY;

    try {
      const verified: any = jwt.verify(token, jwtSecretKey);
      if (!verified) {
        return null;
      }

      const user = await this.model.findByPk(verified.userId);
      return user;
    } catch (error) {
      return null;
    }
  }
}
