import { Includeable } from "sequelize/types";
import { ReservationsModel } from "../models/";
import { ReservationStatusEnum, TReservationModel } from "../models/model.type";
import { BaseService } from "./services.type";

export class ReservationsService extends BaseService<TReservationModel> {
  private model: typeof ReservationsModel;

  constructor() {
    super();
    this.model = ReservationsModel;
  }

  public async create(
    entity: TReservationModel
  ): Promise<Omit<TReservationModel, "status">> {
    const reservation = await this.model.create({
      ...entity,
      status: ReservationStatusEnum.Active,
    });
    return reservation;
  }

  public async findById(id: string): Promise<TReservationModel | null> {
    const reservation = await this.model.findByPk(id);
    return reservation;
  }

  public async findAllBy(input?: {
    where?: Record<string, any>;
    includes?: Includeable;
  }): Promise<Array<TReservationModel>> {
    const reservations = await this.model.findAll({
      where: input?.where,
      include: input?.includes,
    });
    return reservations;
  }

  public async updateById(
    id: string,
    update: Omit<TReservationModel, "userId" | "bikeId">
  ): Promise<void> {
    await this.model.update(update, { where: { id } });
  }

  public async destroy(id: string): Promise<void> {
    await this.model.destroy({ where: { id } });
  }
}
