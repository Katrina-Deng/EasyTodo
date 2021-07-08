/*
 * @Des:
 * @Version:
 * @Author: Ellen
 * @Date: 2021-07-04 17:51:02
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-07 23:12:51
 */
import {
  IsNotEmpty,
  IsNumberString,
  IsNumber,
  MaxLength,
  Min,
  ValidateIf,
} from "class-validator";
import { BoardList as BoardListModel } from "../models/BoardList";
import Boom from "@Hapi/boom";
/**
 * @name: Ellen
 * @test: 验证boardid
 * @msg:
 * @param {*}
 * @return {*}
 */
export class getBoardListBody {
  @IsNumberString(
    {},
    {
      message: "面板id不能为空且必须为数字",
    }
  )
  boardId: number;
}
/**
 * @name: Ellen
 * @test: 验证新增列表
 * @msg:
 * @param {*}
 * @return {*}
 */
export class postBoardListBody {
  @Min(1, {
    message: "面板id不能为空且必须为正整数",
  })
  boardId: number;

  @IsNotEmpty({
    message: "面板列表名称不能为空",
  })
  @MaxLength(255, {
    message: "面板列表名称超过255字符",
  })
  name: string;
}
export class putBoardListBody {
  @ValidateIf((o) => o.boardId !== undefined)
  @Min(1, {
    message: "面板id不能为空且必须为正整数",
  })
  boardId: number;
  @ValidateIf((o) => o.name !== undefined)
  @IsNotEmpty({
    message: "面板列表名称不能为空",
  })
  @MaxLength(255, {
    message: "面板列表名称超过255字符",
  })
  name: string;

  @ValidateIf((o) => o.order !== undefined)
  @IsNumber(
    {},
    {
      message: "orderid不能为空且必须为数字",
    }
  )
  order: number;
}
/**
 * @name: Ellen
 * @test: 验证列表中指定列表是否存在
 * @msg:
 * @param {*}
 * @return {*}
 */
export async function getAndVaildBoardListID(
  id: number,
  userid: number
): Promise<BoardListModel> {
  let board = await BoardListModel.findByPk(id);
  if (!board) {
    throw Boom.notFound("该列表不存在");
  }
  if (board.userId !== userid) {
    throw Boom.forbidden("列表无法访问");
  }

  return board;
}
