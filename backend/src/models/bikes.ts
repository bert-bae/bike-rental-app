import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { TBikeModel } from "./model.type";

class Bikes extends Model<TBikeModel, Optional<TBikeModel, "id">> {
  public id!: string;
  public model!: string;
  public color!: string;
  public location!: string;

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
      model: DataTypes.STRING,
      color: DataTypes.STRING,
      location: DataTypes.STRING,
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
