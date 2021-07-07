/*
 * @Des: 面板列表
 * @Version:
 * @Author: Ellen
 * @Date: 2021-07-04 17:50:11
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-06 23:12:58
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
  Query,
} from "koa-ts-controllers";
import { Context } from "koa";
import {
  postBoardListBody,
  putBoardListBody,
  getBoardListBody,
  getAndVaildBoardListID,
} from "../vaildators/BoardListValid";
import { getAndVaildBoardID } from "../vaildators/BoardVaild";
import { BoardList as BoardListModel } from "../models/BoardList";
import authorization from "../middlewares/authorization";

@Controller("/list")
@Flow([authorization])
export default class BoardListsController {
  @Post("")
  public async createBoardList(
    @Ctx() ctx: Context,
    @Body() body: postBoardListBody
  ) {
    let { boardId, name } = body;
    await getAndVaildBoardID(boardId, ctx.userInfo.id);
    let newBoardList = new BoardListModel();
    // 取最大值
    let maxOrderBoard = await BoardListModel.findOne({
      where: { boardId },
      order: [["order", "desc"]],
    });
    console.log("maxOrderBoard", maxOrderBoard);

    newBoardList.boardId = boardId;
    newBoardList.userId = ctx.userInfo.id;
    newBoardList.name = name;
    newBoardList.order = maxOrderBoard ? maxOrderBoard.order + 65535 : 65535;
    await newBoardList.save();
    ctx.status = 201;
    return newBoardList;
  }

  /**
   * @name: Ellen
   * @test: 获取指定id下所有列表
   * @msg: /list?boardid=1
   * @sql: order by id desc,time asc   按照id排序先从小到大，遇到同名的按照时间排序
   * @param {*}
   * @return {*}
   */
  @Get("")
  public async getBoardLists(
    @Ctx() ctx: Context,
    @Query() query: getBoardListBody
  ) {
    let { boardId } = query;
    // 验证这个board是否属于这个用户
    await getAndVaildBoardID(boardId, ctx.userInfo.id);
    let boardList = await BoardListModel.findAll({
      where: { boardId },
      // [['id','desc'],['time','asc]]
      order: [["order", "asc"]],
    });
    ctx.status = 200;
    return boardList;
  }

  /**
   * @name: Ellen
   * @test: 获取指定列表
   * @msg: /list/1 这种是指定列表 listid
   * @param {*}
   * @return {*}
   */
  @Get("/:id(\\d+)")
  public async getBoardList(@Ctx() ctx: Context, @Params("id") id: number) {
    // 检查这个用户有没有这个list
    let boardList = await getAndVaildBoardListID(id, ctx.userInfo.id);

    return boardList;
  }

  /**
   * @name: Ellen
   * @test: 更新指定列表
   * @msg:list/1
   * @param {*}
   * @return {*}
   */
  @Put("/:id(\\d+)")
  public async putBoardList(
    @Ctx() ctx: Context,
    @Params("id") id: number,
    @Body() body: putBoardListBody
  ) {
    let { boardId, name, order } = body;
    // 检查这个用户有没有这个list
    let boardList = await getAndVaildBoardListID(id, ctx.userInfo.id);
    boardList.boardId = boardId || boardList.boardId;
    boardList.name = name || boardList.name;
    boardList.order = order || boardList.order;
    await boardList.save();
    ctx.status = 204;
    return;
  }

  /**
   * @name: Ellen
   * @test: 删除指定列表
   * @msg:
   * @param {*}
   * @return {*}
   */
  @Delete("/:id(\\d+)")
  public async delBoardList(@Ctx() ctx: Context, @Params("id") id: number) {
    let boardList = await getAndVaildBoardListID(id, ctx.userInfo.id);
    boardList.destroy();
    ctx.status = 204;
    return;
  }
}
