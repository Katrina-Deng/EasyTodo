/*
 * @Des:
 * @Version:
 * @Author: Ellen
 * @Date: 2021-07-10 14:46:36
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-10 17:06:02
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
import authorization from "../middlewares/authorization";
import { getAndVaildBoardListCardID } from "../vaildators/BoardListCardValid";
import { getCommentBody, postCommentBody } from "../vaildators/commentValid";
import { Comment as commentModel } from "../models/Comment";
import { User as userModel } from "../models/User";

@Controller("/comment")
@Flow([authorization])
export default class commentController {
  /**
   * @name: Ellen
   * @test: 添加评论
   * @msg:
   * @param {*}
   * @return {*}
   */
  @Post("")
  public async postComment(@Ctx() ctx: Context, @Body() body: postCommentBody) {
    let { boardListCardId, content } = body;
    await getAndVaildBoardListCardID(boardListCardId, ctx.userInfo.id);
    let newComment = new commentModel();
    newComment.userId = ctx.userInfo.id;
    newComment.boardListCardId = boardListCardId;
    newComment.content = content;
    await newComment.save();
    ctx.status = 201;
    return newComment;
  }

  /**
   * @name: Ellen
   * @test: 获取评论
   * @msg:
   * @param {*}
   * @return {*}
   */
  @Get("")
  public async getComment(@Ctx() ctx: Context, @Query() query: getCommentBody) {
    let { boardListCardId, page } = query;
    console.log("page", page);

    await getAndVaildBoardListCardID(boardListCardId, ctx.userInfo.id);
    let count = await commentModel.count({
      where: { boardListCardId },
    });

    // limit 每页个数
    // count 总数
    // page 页数
    // pages 总页数
    // offset 偏移量
    let limit: number = 2;
    let pages = Math.ceil(count / limit);
    if (!page) {
      page = 1;
    }
    page = Number(page);
    page = Math.min(page, pages);
    page = Math.max(page, 1);

    let comments = await commentModel.findAndCountAll({
      where: { boardListCardId },
      limit: 2,
      offset: (page - 1) * limit, //  例如 10， 从10哪里开始查查后面10条，所以这里0 0后面开始查查1-2条
      order: [["id", "desc"]], //降序从大到小
      include: [
        {
          model: userModel,
          attributes: ["id", "name"],
        },
      ],
    });
    return {
      limit,
      page,
      pages,
      ...comments,
    };
  }
}
