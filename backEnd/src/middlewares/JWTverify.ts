/*
 * @Des: 解密中间件
 * @Version:
 * @Author: Ellen
 * @Date: 2021-07-01 20:47:31
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-01 20:50:57
 */
import { Context, Next } from "koa";
import jwt from "jsonwebtoken";
import configs from "../configs";
import { UserInfo } from "../types/global.ext";

export default function JwtVerify() {
  return async function (ctx: Context, next: Next) {
    const token = ctx.headers["authorization"];
    if (token) {
      ctx.userInfo = jwt.verify(token, configs.jwt.privateKey) as UserInfo;
    }
    await next();
  };
}
