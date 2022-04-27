import { v4 as uuidv4 } from "uuid";
import { FindOptions } from "sequelize/types";
import { BikeLotsModel } from "../models/";
import { TBikeLotsModel } from "../models/model.type";
import { BaseService } from "./services.type";

export class BikeLotsService extends BaseService<TBikeLotsModel> {
  private model: typeof BikeLotsModel;

  constructor() {
    super();
    this.model = BikeLotsModel;
  }

  public async create(entity: TBikeLotsModel): Promise<TBikeLotsModel> {
    const lot = await this.model.create({
      ...entity,
      id: uuidv4(),
    });
    return lot;
  }

  public async findById(id: string): Promise<TBikeLotsModel | null> {
    const lot = await this.model.findByPk(id);
    return lot;
  }

  public async findAllBy(input?: FindOptions): Promise<Array<TBikeLotsModel>> {
    const lots = await this.model.findAll(input);
    return lots;
  }

  public async updateById(id: string, update: TBikeLotsModel): Promise<void> {
    await this.model.update(update, { where: { id } });
  }

  public async destroy(id: string): Promise<void> {
    await this.model.destroy({ where: { id } });
  }
}
