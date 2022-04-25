import { Sequelize } from "sequelize";
import Bikes from "./bikes";
import Users from "./users";
import BikeReviews from "./bikereviews";
import Reservations from "./reservations";

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../../config/config.json")[env];

const sequelizeConnection = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const BikesModel = Bikes(sequelizeConnection);
const UsersModel = Users(sequelizeConnection);
const BikeReviewsModel = BikeReviews(sequelizeConnection);
const ReservationsModel = Reservations(sequelizeConnection);

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

UsersModel.hasMany(ReservationsModel, {
  sourceKey: "id",
  foreignKey: "userId",
  as: "reservations",
});
ReservationsModel.belongsTo(UsersModel, {
  foreignKey: "bikeId",
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

export { BikesModel, UsersModel, BikeReviewsModel, ReservationsModel };
