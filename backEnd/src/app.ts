/*
 * @Des:
 * @Version:
 * @Author: Ellen
 * @Date: 2021-06-09 21:40:16
 * @LastEditors: Ellen
 * @LastEditTime: 2021-06-30 23:04:32
 */
import path from "path";
import configs from "./configs";
import Koa from "koa";
import koaRouter from "koa-router";
import koaBody from "koa-body";
import { bootstrapControllers } from "koa-ts-controllers";
import { log } from "./utils/index";
import Boom from "@hapi/boom";
import { Sequelize } from "sequelize-typescript";

const app: Koa = new Koa();
const router: koaRouter = new koaRouter();

~(async function () {
  // db
  const db = new Sequelize({
    ...configs.dataBase,
    models: [__dirname + "\\models/**/*"],
  });
  await bootstrapControllers(app, {
    router,
    basePath: "/api",
    versions: [1],
    // windows '\\'
    controllers: [path.resolve(__dirname + "\\controllers/**/*.ts")],
    // 统一处理
    errorHandler: async (error: any, ctx: any) => {
      let statusCode: number = 500;
      let body: any = {
        statusCode: statusCode,
        error: "Internal Server error",
        message: "An internal server error occurred",
      };

      //400+ err
      if (error.output) {
        statusCode = error.output.statusCode;
        body = { ...error.output.payload };
        if (error.data) {
          body.errDetails = error.data;
        }
      }
      ctx.status = statusCode;
      ctx.body = body;
    },
  });
  router.all("/(.*)", async (ctx) => {
    throw Boom.notFound("router not found");
  });
  app.use(koaBody());
  app.use(router.routes());
  app.listen(configs.server.port, () => {
    log("hello koa");
    log(`服务启动成功：http://${configs.server.host}:${configs.server.port}`);
  });
})();
