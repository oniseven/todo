import { Sequelize } from "sequelize-typescript";

import config, { getDatabaseConfig } from "../../configs";

const dbConfigs = getDatabaseConfig(config);
const dbConn = new Sequelize(dbConfigs);

export default dbConn;
