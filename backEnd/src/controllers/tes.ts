/*
 * @Des:
 * @Version:
 * @Author: Ellen
 * @Date: 2021-06-09 22:38:45
 * @LastEditors: Ellen
 * @LastEditTime: 2021-06-30 23:06:36
 */
// /*
//  * @Des:测试路由
//  * @Version:
//  * @Author: Ellen
//  * @Date: 2021-06-09 22:38:45
//  * @LastEditors: Ellen
//  * @LastEditTime: 2021-06-30 22:50:50
//  */
// import {
//   Controller,
//   Get,
//   Params,
//   Query,
//   Body,
//   Header,
//   Post,
//   options,
// } from "koa-ts-controllers";

// import { IsNumberString } from "class-validator";
// import Boom from "@hapi/boom";

// // query valid
// class GetUserQuery {
//   @IsNumberString(
//     { no_symbols: false },
//     {
//       message: "page must be number",
//     }
//   )
//   page: number;
// }

// @Controller("/test")
// class test {
//   // @Get("/hello")
//   // // 访问不存在属性
//   // async test(a:any) {
//   //   console.log(a.b);
//   //   return "hello test";
//   // }
//   // // 部分验证
//   // @Get("/user/:id(\\d+)")
//   // async userParams(@Params() info: { id: number }) {
//   //   return `当前用户的id：${info.id}`;
//   // }
//   // // query验证
//   // @Get("/users")
//   // async users(
//   //   @Query() query: GetUserQuery
//   // ){
//   //   if (true) {
//   //     throw Boom.notFound('注册失败',"用户名重复")
//   //   }
//   //   // return `当页码：${query.page}`
//   // }
//   // @Get("/user")
//   // async userQuery(@Query() info: { id: number }) {
//   //   return `当前用户的id：${info.id}`;
//   // }
//   // @Post("/userInfo")
//   // async userBody(
//   //   @Body() info: { id: number; name: string },
//   //   @Header() header: any
//   // ) {
//   //   console.log("info", info);
//   //   console.log("header", header);
//   //   return `当前用户的id：${JSON.stringify(info)}`;
//   // }
// }
