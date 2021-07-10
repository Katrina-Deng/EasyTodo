/*
 * @Des:
 * @Version:
 * @Author: Ellen
 * @Date: 2021-07-07 23:01:45
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-10 15:37:22
 */
import {
  IsNotEmpty,
  MaxLength,
  ValidateIf,
  Min,
  IsNumberString,
} from "class-validator";
import { BoardListCard as BoardListCardModel } from "../models/BoardListCard";
import { CardAttachment as CardAttachmentModel } from "../models/CardAttachment";
import Boom from "@hapi/boom";

export class postCardbody {
  @Min(1, {
    message: "卡片id不能为空且必须为正整数",
  })
  boardListId: number;

  @IsNotEmpty({ message: "名称不能位空" })
  @MaxLength(255, { message: "名称不能超过255字符" })
  name: string;

  @ValidateIf((o) => o.description !== undefined)
  @MaxLength(2000, { message: "名称不能超过2000字符" })
  description: string;

  order: number;
}

export class getCardbody {
  @IsNumberString(
    {},
    {
      message: "卡片id不能为空且必须为数字",
    }
  )
  boardListId: number;
}
/**
 * @name: Ellen
 * @test: 更新
 * @msg:
 * @param {*}
 * @return {*}
 */
export class putCardbody {
  @ValidateIf((o) => o.boardListId !== undefined)
  @Min(1, {
    message: "卡片id不能为空且必须为正整数",
  })
  boardListId?: number;

  @ValidateIf((o) => o.name !== undefined)
  @IsNotEmpty({ message: "名称不能位空" })
  @MaxLength(255, { message: "名称不能超过255字符" })
  name?: string;

  @ValidateIf((o) => o.description !== undefined)
  @MaxLength(2000, { message: "名称不能超过2000字符" })
  description?: string;

  order: number;
}

/**
 * @name: Ellen
 * @test: 验证列表中指定列表是否存在
 * @msg:
 * @param {*}
 * @return {*}
 */
export async function getAndVaildBoardListCardID(
  id: number,
  userid: number
): Promise<BoardListCardModel> {
  let board = await BoardListCardModel.findByPk(id);
  if (!board) {
    throw Boom.notFound("该卡片不存在");
  }
  if (board.userId !== userid) {
    throw Boom.forbidden("卡片无法访问");
  }

  return board;
}

/**
 * @name: Ellen
 * @test: 附件是否属于改用户
 * @msg:
 * @param {*}
 * @return {*}
 */
export async function getAndVaildCardAttachment(
  id: number,
  userid: number
): Promise<CardAttachmentModel> {
  let board = await CardAttachmentModel.findByPk(id);
  if (!board) {
    throw Boom.notFound("该附件不存在");
  }
  if (board.userId !== userid) {
    throw Boom.forbidden("附件无法访问");
  }

  return board;
}
