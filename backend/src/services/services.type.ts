import { Includeable } from "sequelize";

export abstract class BaseService<TEntity> {
  protected abstract create(entity: TEntity): Promise<any>;

  protected abstract findAllBy(
    where: Record<string, any>,
    includes: Includeable
  ): Promise<Array<any>>;

  protected abstract findById(id: string): Promise<any | null>;

  protected abstract updateOne(id: string, update: TEntity): Promise<void>;

  protected abstract destroy(id: string): Promise<void>;
}

export abstract class Authorizer {
  protected abstract login(
    username: string,
    password: string
  ): Promise<{ jwt: string }>;

  protected abstract authorize(token: string): Promise<any>;
}
