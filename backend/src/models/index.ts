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

export const BikesModel = Bikes(sequelizeConnection);
export const UsersModel = Users(sequelizeConnection);
export const BikeReviewsModel = BikeReviews(sequelizeConnection);
export const ReservationsModel = Reservations(sequelizeConnection);
