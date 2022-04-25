import { v4 as uuidv4 } from "uuid";
import { FindOptions } from "sequelize/types";
import { BikeReviewsModel } from "../models/";
import { TBikeReviewModel } from "../models/model.type";
import { BaseService } from "./services.type";

export class BikeReviewsService extends BaseService<TBikeReviewModel> {
  private model: typeof BikeReviewsModel;

  constructor() {
    super();
    this.model = BikeReviewsModel;
  }

  public async create(
    entity: TBikeReviewModel
  ): Promise<Omit<TBikeReviewModel, "id">> {
    const review = await this.model.create({
      ...entity,
      id: uuidv4(),
    });
    return review;
  }

  public async findById(id: string): Promise<TBikeReviewModel | null> {
    const review = await this.model.findByPk(id);
    return review;
  }

  public async findAllBy(
    input?: FindOptions
  ): Promise<Array<TBikeReviewModel>> {
    const reviews = await this.model.findAll(input);
    return reviews;
  }

  public async updateById(
    id: string,
    update: Pick<TBikeReviewModel, "rating">
  ): Promise<void> {
    await this.model.update(update, { where: { id } });
  }

  public async destroy(id: string): Promise<void> {
    await this.model.destroy({ where: { id } });
  }
}
