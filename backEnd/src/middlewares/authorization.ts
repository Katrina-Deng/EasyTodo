/*
 * @Des:
 * @Version:
 * @Author: Ellen
 * @Date: 2021-07-01 17:34:52
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-01 17:43:03
 */
import { Context, Next } from "koa";
import Boom from "@hapi/boom";

export default async function authorization(ctx: Context, next: Next) {
  if (!ctx.userInfo || ctx.userInfo.id < 1) {
    throw Boom.unauthorized("用户没有登录");
  }
  await next();
}
