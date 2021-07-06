/*
 * @Des: 扩展koa声明
 * @Version:
 * @Author: Ellen
 * @Date: 2021-07-01 16:58:08
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-03 17:17:43
 */

import koa from "koa";
import { UserInfo } from "./global.ext";
// declare module 才是定义一个模块，才能被 import，

// 扩展koa的声明
declare module "koa" {
  interface Context {
    userInfo: UserInfo;
  }
}
