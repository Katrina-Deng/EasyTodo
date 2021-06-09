/*
 * @Des:测试路由
 * @Version:
 * @Author: Ellen
 * @Date: 2021-06-09 22:38:45
 * @LastEditors: Ellen
 * @LastEditTime: 2021-06-09 23:41:07
 */
import {
  Controller,
  Get,
  Params,
  Query,
  Body,
  Header,
  Post,
} from "koa-ts-controllers";

@Controller("/test")
class test {
  @Get("/hello")
  async test() {
    return "hello test";
  }

  @Get("/user/:id")
  async userParams(@Params() info: { id: number }) {
    return `当前用户的id：${info.id}`;
  }

  @Get("/user")
  async userQuery(@Query() info: { id: number }) {
    return `当前用户的id：${info.id}`;
  }

  @Post("/userInfo")
  async userBody(
    @Body() info: { id: number; name: string },
    @Header() header: any
  ) {
    console.log("info", info);
    console.log("header", header.host);

    return `当前用户的id：${JSON.stringify(info)}`;
  }
}
