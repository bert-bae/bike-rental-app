import { FindOptions } from "sequelize";

export abstract class BaseService<TEntity> {
  protected abstract create(entity: TEntity): Promise<any>;

  protected abstract findAllBy(input?: FindOptions): Promise<Array<any>>;

  protected abstract findById(
    id: string,
    options: FindOptions
  ): Promise<any | null>;

  protected abstract updateById(id: string, update: TEntity): Promise<void>;

  protected abstract destroy(id: string): Promise<void>;
}

export abstract class Authorizer {
  protected abstract login(
    username: string,
    password: string
  ): Promise<{ jwt: string }>;

  protected abstract authorize(token: string): Promise<any>;
}
