import { UserService } from "./users";
import { AuthService } from "./authorizer";

export const authService = new AuthService();
export const userService = new UserService();
