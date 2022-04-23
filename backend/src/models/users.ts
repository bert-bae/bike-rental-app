import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { TUserModel, UserRoleEnum } from "./model.type";

class Users extends Model<TUserModel, Optional<TUserModel, "id">> {
  public id!: string;
  public name!: string;
  public username!: string;
  public password!: string;
  public role!: UserRoleEnum;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const init = (sequelizeConnection: Sequelize) => {
  Users.init(
    {
      id: {
        type: DataTypes.STRING,
        autoIncrement: false,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize: sequelizeConnection,
      modelName: "Users",
    }
  );
  return Users;
};

export default init;
