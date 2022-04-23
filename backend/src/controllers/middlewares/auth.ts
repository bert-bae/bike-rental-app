import { authService } from "../../services";
import { UserRoleEnum } from "../../models/model.type";

const authorize =
  (role: UserRoleEnum) => async (req: any, res: any, next: any) => {
    const tokenHeaderKey = <string>process.env.TOKEN_HEADER_KEY;
    const token = req.header(tokenHeaderKey);
    const tokenKey = token.split(" ")[1];
    if (!tokenKey) {
      throw new Error("Unable to authorize. The token is invalid.");
    }

    const user = await authService.authorize(tokenKey);
    if (!user) {
      throw new Error("Unable to authorize. The token is invalid.");
    }

    // req.user = user;
    if (user.role !== role) {
      throw new Error("Unable to authorize. Roles are not aligned.");
    }
    req.user = {
      id: user.id,
      username: user.username,
      role: user.role,
      name: user.name,
    };

    next();
  };

export default authorize;
