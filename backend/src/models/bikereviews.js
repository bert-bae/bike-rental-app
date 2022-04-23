"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BikeReviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BikeReviews.init(
    {
      bike_id: DataTypes.STRING,
      user_id: DataTypes.STRING,
      rating: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: "BikeReviews",
    }
  );
  return BikeReviews;
};
