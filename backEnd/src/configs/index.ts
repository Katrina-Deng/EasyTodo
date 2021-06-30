/*
 * @Des: 配置环境变量
 * @Version:1.0
 * @Author: Ellen
 * @Date: 2021-06-09 19:35:35
 * @LastEditors: Ellen
 * @LastEditTime: 2021-06-30 21:30:16
 */
import databaseConfig from './database.json'

interface IDataType{
  host:string,
  username:string,
  password:string,
  port:number,
  timezone:string,
  database:string,
  dialect: 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql'
}

const configs = {
  development: {
    server: {
      host: "localhost",
      port: 9527,
    },
    dataBase:databaseConfig.development as IDataType
  },
  test: {
    server: {
      host: "localhost",
      port: 9527,
    },
    dataBase:databaseConfig.test as IDataType
  },
  production: {
    server: {
      host: "localhost",
      port: 9527,
    },
    dataBase:databaseConfig.production as IDataType

  },
};

type configKeys = keyof typeof configs;

const NODE_ENV = (process.env.NODE_ENV as configKeys) || "development";

export default configs[NODE_ENV];
