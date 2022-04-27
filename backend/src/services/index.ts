import { UserService } from "./users";
import { BikesService } from "./bikes";
import { BikeLotsService } from "./bikeLots";
import { BikeReviewsService } from "./bikeReviews";
import { ReservationsService } from "./reservations";
import { AuthService } from "./authorizer";

export const authService = new AuthService();
export const userService = new UserService();
export const bikeService = new BikesService();
export const bikeLotsService = new BikeLotsService();
export const bikeReviewsService = new BikeReviewsService();
export const reservationService = new ReservationsService();
