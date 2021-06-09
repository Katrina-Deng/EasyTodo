/*
 * @Des:
 * @Version:
 * @Author: Ellen
 * @Date: 2021-06-09 21:40:16
 * @LastEditors: Ellen
 * @LastEditTime: 2021-06-09 23:35:45
 */
import path from "path";
import configs from "./configs";
import Koa from "koa";
import koaRouter from "koa-router";
import koaBody from "koa-body";
import { bootstrapControllers } from "koa-ts-controllers";
import { log } from "./utils/index";

const app: Koa = new Koa();
const router: koaRouter = new koaRouter();

~(async function () {
  await bootstrapControllers(app, {
    router,
    basePath: "/api",
    versions: [1],
    // windows '\\'
    controllers: [path.resolve(__dirname + "\\controllers/**/*.ts")],
  });
  app.use(koaBody());
  app.use(router.routes());
  app.listen(configs.server.port, () => {
    log("hello koa");
    log(`服务启动成功：http://${configs.server.host}:${configs.server.port}`);
  });
})();
