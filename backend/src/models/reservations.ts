import { DataTypes, Model, Sequelize } from "sequelize";
import { TReservationModel, ReservationStatusEnum } from "./model.type";

class Reservations extends Model<TReservationModel, TReservationModel> {
  public user_id!: string;
  public bike_id!: string;
  public start_time!: string;
  public end_time!: string;
  public status!: ReservationStatusEnum;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const init = (sequelizeConnection: Sequelize) => {
  Reservations.init(
    {
      user_id: {
        type: DataTypes.STRING,
        references: "Users",
        key: "id",
      },
      bike_id: {
        type: DataTypes.STRING,
        references: "Bikes",
        key: "id",
      },
      start_time: DataTypes.STRING,
      end_time: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize: sequelizeConnection,
      modelName: "Reservations",
    }
  );
  return Reservations;
};

export default init;
