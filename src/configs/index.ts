import path from "path";
import { SequelizeOptions } from "sequelize-typescript";

interface AppConfig {
  port: string;
  env: string;
  database: {
    production: SequelizeOptions;
    test: SequelizeOptions;
    development: SequelizeOptions;
  },
  [key: string]: any;
};

const config: AppConfig = {
  port: process.env.PORT || '8008',
  env: process.env.NODE_ENV || 'development',
  database: {
    development: {
      database: process.env.DB_NAME_DEV || "db_todo",
      dialect: "mysql",
      username: process.env.DB_USERNAME_DEV || "root",
      password: process.env.DB_PASSWORD_DEV || "",
      host: process.env.DB_HOST_DEV || "localhost",
      port: +(process.env.DB_PORT_DEV || 3306),
      models: [path.join(__dirname, "/../models/**/*.{js,ts}")],
      define: {
        timestamps: false,
      },
    },
    test: {
      database: process.env.DB_NAME_TEST || "db_todo",
      dialect: "mysql",
      username: process.env.DB_USERNAME_TEST || "root",
      password: process.env.DB_PASSWORD_TEST || "",
      host: process.env.DB_HOST_TEST || "localhost",
      port: +(process.env.DB_PORT_TEST || 3306),
      models: [path.join(__dirname, "/../models/**/*.{js,ts}")],
      define: {
        timestamps: false,
      },
    },
    production: {
      database: process.env.DB_NAME || "db_todo",
      dialect: "mysql",
      username: process.env.DB_USERNAME || "root",
      password: process.env.DB_PASSWORD || "",
      host: process.env.DB_HOST || "localhost",
      port: +(process.env.DB_PORT || 3306),
      models: [path.join(__dirname, "/../models/**/*.{js,ts}")],
      define: {
        timestamps: false,
      },
      logging: false,
    }
  },
  JWT_SECRET: process.env.JWT_ENCRYPTION || "secret",
  JWT_EXPIRED: process.env.JWT_EXPIRATION || "1h",
};

export const getDatabaseConfig = (config: AppConfig) => {
  switch(config.env){
    case 'production': 
      return config.database.production
    case 'development':
      return config.database.development
    case 'test':
      return config.database.test
    default:
      return config.database.development
  }
}

export default config;