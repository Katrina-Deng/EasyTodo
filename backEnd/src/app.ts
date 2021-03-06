/*
 * @Des:
 * @Version:
 * @Author: Ellen
 * @Date: 2021-06-09 21:40:16
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-09 18:09:09
 */
import path from "path";
import configs from "./configs";
import Koa, { Context } from "koa";
import koaRouter from "koa-router";
import koaBody from "koa-body";
import { bootstrapControllers } from "koa-ts-controllers";
import { log } from "./utils/index";
import Boom from "@hapi/boom";
import { Sequelize } from "sequelize-typescript";
import JwtVerify from "./middlewares/JWTverify";
import koaStaticCache from "koa-static-cache";

~(async function () {
  const app: Koa = new Koa();
  const router: koaRouter = new koaRouter();
  app.use(
    koaStaticCache({
      dir: configs.storage.dir,
      prefix: configs.storage.path,
      gzip: true,
      dynamic: true,
    })
  );

  // connect db
  const db = new Sequelize({
    ...configs.dataBase,
    models: [__dirname + "\\models/**/*"],
  });

  // jwt  解密 挂载 userInfo in Ctx
  app.use(JwtVerify());

  // Controllers
  await bootstrapControllers(app, {
    router,
    basePath: "/api",
    versions: [1],
    // windows '\\'
    controllers: [path.resolve(__dirname + "\\controllers/**/*.ts")],
    // 统一error处理
    errorHandler: async (error: any, ctx: Context) => {
      console.log("error", error);
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

  app.use(
    koaBody({
      multipart: true,
      formidable: {
        keepExtensions: true,
        uploadDir: configs.storage.dir,
      },
    })
  );
  app.use(router.routes());
  app.listen(configs.server.port, () => {
    log("hello koa");
    log(`服务启动成功：http://${configs.server.host}:${configs.server.port}`);
  });
})();
