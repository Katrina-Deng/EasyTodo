/*
 * @Des: 卡片的路由
 * @Version:
 * @Author: Ellen
 * @Date: 2021-07-07 22:52:14
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-08 22:00:32
 */
import {
  Controller,
  Post,
  Body,
  Ctx,
  Get,
  Put,
  Delete,
  Params,
  Query,
  Flow,
} from "koa-ts-controllers";
import { Context } from "koa";
import authorization from "../middlewares/authorization";
import {
  getAndVaildBoardListCardID,
  postCardbody,
  getCardbody,
  putCardbody,
} from "../vaildators/BoardListCardValid";
import { getAndVaildBoardListID } from "../vaildators/BoardListValid";
import { BoardListCard as BoardListCardModel } from "../models/BoardListCard";
import { CardAttachment } from "../models/CardAttachment";
import { Attachment } from "../models/Attachment";
import { Comment } from "../models/Comment";
import configs from "../configs/index";

@Controller("/card")
@Flow([authorization])
export class BoardListCard {
  /**
   * @name: Ellen
   * @test: 新增卡片
   * @msg:
   * @param {*}
   * @return {*}
   */
  @Post("")
  public async postCard(@Ctx() ctx: Context, @Body() body: postCardbody) {
    let { boardListId, name, description } = body;
    await getAndVaildBoardListID(boardListId, ctx.userInfo.id);
    let postCard = new BoardListCardModel();
    postCard.userId = ctx.userInfo.id;
    postCard.boardListId = boardListId;
    postCard.name = name;
    postCard.order = 65535;
    postCard.description = description || "";
    await postCard.save();
    ctx.status = 201;
    return postCard;
  }
  /**
   * @name: Ellen
   * @test: 获取全部卡片
   * @msg:/card?boardListId=1
   * @param {*}
   * @return {*}
   */
  @Get("")
  public async getCardLists(@Ctx() ctx: Context, @Query() query: getCardbody) {
    let { boardListId } = query;
    await getAndVaildBoardListID(boardListId, ctx.userInfo.id);
    let getCards = await BoardListCardModel.findAll({
      where: { boardListId },
      order: [["id", "asc"]],
      include: [
        {
          model: Comment,
          attributes: ["id"],
        },
        {
          model: CardAttachment,
          // attributes: ["id"],
          include: [
            {
              model: Attachment,
            },
          ],
        },
      ],
    });
    // 返回数据重组
    let getCardsData = getCards.map((card: BoardListCardModel) => {
      //  封面路径
      let coverPath = "";
      let attachments = card.attachments.map((attachment: CardAttachment) => {
        // attachment 会有很多额外的属性
        // console.log("attachment", attachment);
        // toJSON() 去掉额外的属性 data 包含CardAttachment + details信息
        let data = attachment.toJSON() as CardAttachment & {
          path: string;
        };
        data.path = configs.storage.path + "/" + data.detail.name;
        if (data.isCover) {
          coverPath = data.path;
        }
        return data;
      });
      return {
        id: card.id,
        userId: card.userId,
        boardListId: card.boardListId,
        name: card.name,
        description: card.description,
        order: card.order,
        createdAt: card.createdAt,
        updatedAt: card.updatedAt,
        attachments: attachments,
        coverPath: coverPath,
        commentCount: card.comments.length,
      };
    });
    ctx.status = 200;
    return getCardsData;
  }

  /**
   * @name: Ellen
   * @test: 获取单个卡片
   * @msg: /card/id
   * @param {*}
   * @return {*}
   */
  @Get("/:id(\\d+)")
  public async getCardList(@Ctx() ctx: Context, @Params("id") id: number) {
    let getCard = await getAndVaildBoardListCardID(id, ctx.userInfo.id);
    ctx.status = 200;
    return getCard;
  }

  /**
   * @name: Ellen
   * @test:更新单个卡片
   * @msg:
   * @param {*}
   * @return {*}
   */
  @Put("/:id(\\d+)")
  public async putCardList(
    @Ctx() ctx: Context,
    @Params("id") id: number,
    @Body() body: putCardbody
  ) {
    let { boardListId, name, description, order } = body;
    let putCard = await getAndVaildBoardListCardID(id, ctx.userInfo.id);
    putCard.boardListId = boardListId || putCard.boardListId;
    putCard.name = name || putCard.name;
    putCard.order = order || putCard.order;
    putCard.description = description || putCard.description;
    await putCard.save();
    ctx.status = 204;
    return;
  }

  /**
   * @name: Ellen
   * @test: 删除单个卡片
   * @msg:
   * @param {*}
   * @return {*}
   */
  @Delete("/:id(\\d+)")
  public async DeleteCardList(@Ctx() ctx: Context, @Params("id") id: number) {
    let delCard = await getAndVaildBoardListCardID(id, ctx.userInfo.id);
    delCard.destroy();
    ctx.status = 204;
    return;
  }
}
