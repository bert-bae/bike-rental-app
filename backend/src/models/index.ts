import { Sequelize } from "sequelize";
import Bikes from "./bikes";
import Users from "./users";
import BikeReviews from "./bikereviews";
import Reservations from "./reservations";
import BikeLots from "./bikelots";

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../../config/config.json")[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  { ...config, operatorsAliases: true }
);

const BikesModel = Bikes(sequelize);
const BikeLotsModel = BikeLots(sequelize);
const UsersModel = Users(sequelize);
const BikeReviewsModel = BikeReviews(sequelize);
const ReservationsModel = Reservations(sequelize);

BikesModel.hasMany(ReservationsModel, {
  sourceKey: "id",
  foreignKey: "bikeId",
  as: "reservations",
});
ReservationsModel.belongsTo(BikesModel, {
  foreignKey: "bikeId",
  as: "bike",
  onDelete: "CASCADE",
});

BikeLotsModel.hasMany(BikesModel, {
  sourceKey: "id",
  foreignKey: "bikeLotId",
  as: "bikes",
});
BikesModel.belongsTo(BikeLotsModel, {
  foreignKey: "bikeLotId",
  as: "location",
});

UsersModel.hasMany(ReservationsModel, {
  sourceKey: "id",
  foreignKey: "userId",
  as: "reservations",
});
ReservationsModel.belongsTo(UsersModel, {
  foreignKey: "userId",
  as: "user",
  onDelete: "CASCADE",
});

UsersModel.hasMany(BikeReviewsModel, {
  sourceKey: "id",
  foreignKey: "userId",
  as: "reviews",
});
BikeReviewsModel.belongsTo(UsersModel, {
  foreignKey: "id",
  onDelete: "CASCADE",
});

BikesModel.hasMany(BikeReviewsModel, {
  sourceKey: "id",
  foreignKey: "bikeId",
  as: "reviews",
});

BikeReviewsModel.belongsTo(BikesModel, {
  foreignKey: "id",
  onDelete: "CASCADE",
});

export {
  sequelize,
  BikesModel,
  UsersModel,
  BikeReviewsModel,
  ReservationsModel,
  BikeLotsModel,
};
