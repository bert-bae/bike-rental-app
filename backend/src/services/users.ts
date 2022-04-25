import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { Includeable } from "sequelize/types";
import { UsersModel } from "../models/";
import { TUserModel } from "../models/model.type";
import { BaseService } from "./services.type";

export class UserService extends BaseService<TUserModel> {
  private model: typeof UsersModel;
  private passwordSaltRounds: number;
  constructor() {
    super();
    this.model = UsersModel;
    this.passwordSaltRounds = 10;
  }

  public async create(
    entity: TUserModel
  ): Promise<Omit<TUserModel, "password">> {
    const userByUsername = await this.model.findOne({
      where: { username: entity.username },
    });
    if (userByUsername) {
      throw new Error(`User with username ${entity.username} already exists`);
    }

    const userEntity: TUserModel = {
      ...entity,
      id: uuidv4(),
      password: await bcrypt.hash(entity.password, this.passwordSaltRounds),
    };

    const user = await this.model.create(userEntity);
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      role: user.role,
    };
  }

  public async findById(id: string): Promise<TUserModel | null> {
    const user = await this.model.findByPk(id);
    return user;
  }

  public async findAllBy(input?: {
    where?: Record<string, any>;
    includes?: Includeable;
  }): Promise<Array<TUserModel>> {
    const users = await this.model.findAll({
      where: input?.where,
      include: input?.includes,
    });
    return users;
  }

  public async updateById(
    id: string,
    update: Partial<TUserModel>
  ): Promise<void> {
    if (update.password) {
      update.password = await bcrypt.hash(
        update.password,
        this.passwordSaltRounds
      );
    }
    await this.model.update(update, { where: { id } });
  }

  public async destroy(id: string): Promise<void> {
    await this.model.destroy({ where: { id } });
  }
}
