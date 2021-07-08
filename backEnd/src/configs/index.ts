/*
 * @Des: 配置环境变量
 * @Version:1.0
 * @Author: Ellen
 * @Date: 2021-06-09 19:35:35
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-08 22:54:03
 */
import databaseConfig from "./database.json";
import path from "path";

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
    storage: {
      dir: path.resolve(__dirname, "../attachments"),
      path: "/public/attachments",
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
    storage: {
      dir: path.resolve(__dirname + "../attachments"),
      path: "/public/attachments",
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
    storage: {
      dir: path.resolve(__dirname + "../attachments"),
      path: "/public/attachments",
    },
  },
};

type configKeys = keyof typeof configs;

const NODE_ENV = (process.env.NODE_ENV as configKeys) || "development";

export default configs[NODE_ENV];
