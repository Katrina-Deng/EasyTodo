/*
 * @Des: 配置环境变量
 * @Version:1.0
 * @Author: Ellen
 * @Date: 2021-06-09 19:35:35
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-04 11:32:11
 */
import databaseConfig from "./database.json";

//  dataBase Type
interface IDataType {
  host: string;
  username: string;
  password: string;
  port: number;
  timezone: string;
  database: string;
  // sequelize rules type
  dialect: "mysql" | "postgres" | "sqlite" | "mariadb" | "mssql";
}

const configs = {
  development: {
    server: {
      host: "localhost",
      port: 9527,
    },
    dataBase: databaseConfig.development as IDataType,
    jwt: {
      privateKey: "snake",
    },
  },
  test: {
    server: {
      host: "localhost",
      port: 9527,
    },
    dataBase: databaseConfig.test as IDataType,
    jwt: {
      privateKey: "snake",
    },
  },
  production: {
    server: {
      host: "localhost",
      port: 9527,
    },
    dataBase: databaseConfig.production as IDataType,
    jwt: {
      privateKey: "snake",
    },
  },
};

type configKeys = keyof typeof configs;

const NODE_ENV = (process.env.NODE_ENV as configKeys) || "development";

export default configs[NODE_ENV];
