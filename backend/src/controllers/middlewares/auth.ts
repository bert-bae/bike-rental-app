import { authService } from "../../services";
import { UserRoleEnum } from "../../models/model.type";

const authorize =
  (role: UserRoleEnum) => async (req: any, res: any, next: any) => {
    const tokenHeaderKey = <string>process.env.TOKEN_HEADER_KEY;
    const token = req.header(tokenHeaderKey);
    const tokenKey = token.split(" ")[1];
    console.log("!!!!!!token");
    console.log(token);
    if (!tokenKey) {
      res.status(403).send({
        error: {
          message: "Unable to authorize. The token is invalid.",
        },
      });
      return;
    }

    const user = await authService.authorize(tokenKey);
    console.log("!!!");
    console.log(user);
    console.log(role);
    if (!user) {
      res.status(403).send({
        error: {
          message: "Unable to authorize. The token is invalid.",
        },
      });
      return;
    }

    if (user.role !== role) {
      res.status(403).send({
        error: {
          message: "User does not have enough permissions",
        },
      });
      return;
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
