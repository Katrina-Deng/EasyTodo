/*
 * @Des: 用户相关接口
 * @Version:
 * @Author: Ellen
 * @Date: 2021-06-30 22:39:42
 * @LastEditors: Ellen
 * @LastEditTime: 2021-06-30 23:13:30
 */
import { Controller, Post, Body } from "koa-ts-controllers";
import { RegisterVaild } from "../vaildators/UserValid";

@Controller("/user")
export class User {
  @Post("/register")
  async register(@Body() body: RegisterVaild) {}
}
