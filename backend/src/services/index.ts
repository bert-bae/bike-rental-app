import { UserService } from "./users";
import { BikesService } from "./bikes";
import { ReservationsService } from "./reservations";
import { AuthService } from "./authorizer";

export const authService = new AuthService();
export const userService = new UserService();
export const bikeService = new BikesService();
export const reservationService = new ReservationsService();
