/*
 * @Des:
 * @Version:
 * @Author: Ellen
 * @Date: 2021-07-03 16:43:40
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-04 19:13:56
 */
import {
  Controller,
  Post,
  Body,
  Ctx,
  Get,
  Put,
  Delete,
  Flow,
  Params,
} from "koa-ts-controllers";
import { Context } from "koa";
import {
  PostBoardInfo,
  PutBoardInfo,
  getAndVaildBoardID,
} from "../vaildators/BoardVaild";
import { Board as BoardModel } from "../models/Board";

import authorization from "../middlewares/authorization";

@Controller("/board")
@Flow([authorization])
export class Board {
  /**
   * 新建面板
   */
  @Post("")
  public async createBoard(@Ctx() ctx: Context, @Body() body: PostBoardInfo) {
    // body
    let { name } = body;

    let board = new BoardModel();
    board.name = name;
    board.userId = ctx.userInfo.id;
    await board.save();
    ctx.status = 201;
    return board;
  }

  /**
   * 获取用户所有面板
   */
  @Get("")
  public async getBoards(@Ctx() ctx: Context) {
    let where = { userId: ctx.userInfo.id };
    let boards = await BoardModel.findAll({ where });

    return {
      data: boards,
      meta: {
        page: 1,
        size: 10,
        total: 1000,
      },
    };
  }

  /**
   * 获取指定面板
   */
  @Get("/:id(\\d+)")
  public async getBoard(@Ctx() ctx: Context, @Params("id") id: number) {
    // body
    // https://blog.csdn.net/lvyuan1234/article/details/87010463
    // Pk id primary key
    let board = await getAndVaildBoardID(id, ctx.userInfo.id);
    return board;
  }

  /**
   * 更新面板
   */
  @Put("/:id(\\d+)")
  public async updateBoard(
    @Ctx() ctx: Context,
    @Params("id") id: number,
    @Body() body: PutBoardInfo
  ) {
    // body
    let board = await getAndVaildBoardID(id, ctx.userInfo.id);
    console.log("board", board);

    let { name } = body;
    board.name = name || board.name;
    ctx.status = 204;
    await board.save();
  }

  /**
   * 删除面板
   */
  @Delete("/:id(\\d+)")
  public async delBoard(@Ctx() ctx: Context, @Params("id") id: number) {
    // body
    console.log("userid", ctx.userInfo.id);

    let board = await getAndVaildBoardID(id, ctx.userInfo.id);
    await board.destroy();
    ctx.status = 204;
  }
}
