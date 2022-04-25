import { authService } from "../../services";
import { UserRoleEnum } from "../../models/model.type";

export const authorizeUser = async (req: any, res: any, next: any) => {
  const tokenHeaderKey = <string>process.env.TOKEN_HEADER_KEY;
  const token = req.header(tokenHeaderKey);
  const tokenKey = token.split(" ")[1];
  if (!tokenKey) {
    res.status(403).send({
      error: {
        message: "Unable to authorize. The token is invalid.",
      },
    });
    return;
  }

  const user = await authService.authorize(tokenKey);
  if (!user) {
    res.status(403).send({
      error: {
        message: "Unable to authorize. The token is invalid.",
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

export const authorizeRole =
  (role: UserRoleEnum) => (req: any, res: any, next: any) => {
    if (role === UserRoleEnum.Admin && req.user.role !== role) {
      res.status(403).send({
        error: {
          message: "User does not have enough permissions",
        },
      });
      return;
    }

    next();
  };
