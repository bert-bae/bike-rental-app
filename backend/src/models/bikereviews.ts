import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { TBikeReviewModel } from "./model.type";

class BikeReviews extends Model<
  TBikeReviewModel,
  Optional<TBikeReviewModel, "id">
> {
  public id!: string;
  public bike_id!: string;
  public user_id!: string;
  public rating!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const init = (sequelizeConnection: Sequelize) => {
  BikeReviews.init(
    {
      id: {
        type: DataTypes.STRING,
        autoIncrement: false,
        primaryKey: true,
      },
      bike_id: {
        type: DataTypes.STRING,
        references: "Bikes",
        key: "id",
      },
      user_id: {
        type: DataTypes.STRING,
        references: "Users",
        key: "id",
      },
      rating: DataTypes.NUMBER,
    },
    {
      sequelize: sequelizeConnection,
      modelName: "BikeReviews",
    }
  );
  return BikeReviews;
};

export default init;
