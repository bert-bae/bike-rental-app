import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { TBikeLotsModel } from "./model.type";

// EXAMPLE SQL TO GET RADIUS SEARCH by meters

// SELECT geom::geography as location, ST_SetSRID(ST_MakePoint(-122.966747,49.244247),4326)::geography as user
// FROM "BikeLots"
// WHERE ST_DWithin(
// 	geom::geography,
// 	ST_SetSRID(ST_MakePoint(49.244247,-122.966747),4326)::geography,
// 	20000
// );

class BikeLots extends Model<TBikeLotsModel, Optional<TBikeLotsModel, "id">> {
  public id!: string;
  public lotName!: string;
  public address!: Record<string, any>;
  public geom!: any;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const init = (sequelizeConnection: Sequelize) => {
  BikeLots.init(
    {
      id: {
        type: DataTypes.STRING,
        autoIncrement: false,
        primaryKey: true,
      },
      lotName: DataTypes.STRING,
      address: DataTypes.JSONB,
      geom: DataTypes.GEOMETRY,
    },
    {
      sequelize: sequelizeConnection,
      modelName: "BikeLots",
    }
  );
  return BikeLots;
};

export default init;
