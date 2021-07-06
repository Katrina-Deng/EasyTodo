/*
 * @Des: 用户相关接口
 * @Version:
 * @Author: Ellen
 * @Date: 2021-06-30 22:39:42
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-03 16:45:44
 */
import { Controller, Post, Body, Ctx } from "koa-ts-controllers";
import { Context } from "koa";
import { RegisterVaild, LoginValid } from "../vaildators/UserValid";
import { User as UserModel } from "../models/User";
import Boom from "@hapi/boom";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import configs from "../configs/index";

@Controller("/user")
export class User {
  /**
   * @name: Ellen
   * @test: 注册
   */
  @Post("/register")
  async register(@Ctx() ctx: Context, @Body() body: RegisterVaild) {
    let { name, password } = body;

    // 操作模型
    const dupUser = await UserModel.findOne({
      where: { name },
    });
    if (dupUser) {
      throw Boom.conflict("注册失败，用户名重复");
    }
    const newUser = new UserModel();
    newUser.name = name;
    newUser.password = password;
    await newUser.save();

    ctx.status = 201;
    return {
      id: newUser.id,
      name: newUser.name,
      createdAt: newUser.createdAt,
    };
  }

  // 登录 login
  @Post("/login")
  async login(@Ctx() ctx: Context, @Body() body: LoginValid) {
    let { name, password } = body;

    const relatedUser = await UserModel.findOne({
      where: { name },
    });
    if (!relatedUser) {
      throw Boom.forbidden("登录失败", "用户名不存在");
    }

    let md5 = crypto.createHash("md5");
    let Pw = md5.update(password).digest("hex");
    if (Pw !== relatedUser.password) {
      throw Boom.forbidden("登录失败", "密码错误");
    }

    let userInfo = { id: relatedUser.id, name: relatedUser.name };

    // jwt 加密
    let token = jwt.sign(userInfo, configs.jwt.privateKey);
    ctx.set("authorization", token);

    return {
      id: relatedUser.id,
      name: relatedUser.name,
    };
  }
}
