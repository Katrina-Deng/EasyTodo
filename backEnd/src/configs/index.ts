/*
 * @Des: 配置环境变量
 * @Version:1.0
 * @Author: Ellen
 * @Date: 2021-06-09 19:35:35
 * @LastEditors: Ellen
 * @LastEditTime: 2021-06-09 22:04:19
 */
const configs = {
  development: {
    server: {
      host: "localhost",
      port: 9527,
    },
  },
  test: {
    server: {
      host: "localhost",
      port: 9527,
    },
  },
  production: {
    server: {
      host: "localhost",
      port: 9527,
    },
  },
};

type configKeys = keyof typeof configs;

const NODE_ENV = (process.env.NODE_ENV as configKeys) || "development";

export default configs[NODE_ENV];
