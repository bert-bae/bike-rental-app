import { DataTypes, Model, Sequelize } from "sequelize";
import { TReservationModel, ReservationStatusEnum } from "./model.type";

class Reservations extends Model<TReservationModel, TReservationModel> {
  public id!: string;
  public userId!: string;
  public bikeId!: string;
  public startTime!: string;
  public endTime!: string;
  public status!: ReservationStatusEnum;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const init = (sequelizeConnection: Sequelize) => {
  Reservations.init(
    {
      id: {
        type: DataTypes.STRING,
        autoIncrement: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.STRING,
        references: "Users",
        key: "id",
      },
      bikeId: {
        type: DataTypes.STRING,
        references: "Bikes",
        key: "id",
      },
      startTime: DataTypes.STRING,
      endTime: DataTypes.STRING,
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
