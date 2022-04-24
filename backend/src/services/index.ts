import { UserService } from "./users";
import { BikesService } from "./bikes";
import { AuthService } from "./authorizer";

export const authService = new AuthService();
export const userService = new UserService();
export const bikeService = new BikesService();
