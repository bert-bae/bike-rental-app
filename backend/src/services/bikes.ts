import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { Includeable } from "sequelize/types";
import { BikesModel } from "../models/";
import { TBikeModel } from "../models/model.type";
import { BaseService } from "./services.type";

export class BikesService extends BaseService<TBikeModel> {
  private model: typeof BikesModel;

  constructor() {
    super();
    this.model = BikesModel;
  }

  public async create(
    entity: TBikeModel
  ): Promise<Omit<TBikeModel, "password">> {
    const bike = await this.model.create({
      ...entity,
      id: uuidv4(),
    });
    return bike;
  }

  public async findById(id: string): Promise<TBikeModel | null> {
    const bike = await this.model.findByPk(id);
    return bike;
  }

  public async findAllBy(input?: {
    where?: Record<string, any>;
    includes?: Includeable;
  }): Promise<Array<TBikeModel>> {
    const bikes = await this.model.findAll({
      where: input?.where,
      include: input?.includes,
    });
    return bikes;
  }

  public async updateById(id: string, update: TBikeModel): Promise<void> {
    await this.model.update(update, { where: { id } });
  }

  public async destroy(id: string): Promise<void> {
    await this.model.destroy({ where: { id } });
  }
}
