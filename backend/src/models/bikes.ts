import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { TBikeModel } from "./model.type";

class Bikes extends Model<TBikeModel, Optional<TBikeModel, "id">> {
  public id!: string;
  public bikeLotId!: string;
  public model!: string;
  public color!: string;
  public available!: boolean;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const init = (sequelizeConnection: Sequelize) => {
  Bikes.init(
    {
      id: {
        type: DataTypes.STRING,
        autoIncrement: false,
        primaryKey: true,
      },
      bikeLotId: {
        type: DataTypes.STRING,
        references: "BikeLots",
        key: "id",
      },
      available: DataTypes.BOOLEAN,
      model: DataTypes.STRING,
      color: DataTypes.STRING,
    },
    {
      sequelize: sequelizeConnection,
      timestamps: true,
      modelName: "Bikes",
    }
  );
  return Bikes;
};

export default init;
