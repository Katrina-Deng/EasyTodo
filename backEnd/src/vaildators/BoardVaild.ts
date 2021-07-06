/*
 * @Des:
 * @Version:
 * @Author: Ellen
 * @Date: 2021-07-03 16:44:01
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-04 19:13:11
 */

import { IsNotEmpty, MaxLength, ValidateIf } from "class-validator";
import { Board as BoardModel } from "../models/Board";
import Boom from "@hapi/boom";
export class PostBoardInfo {
  @IsNotEmpty({
    message: "面板名称不能为空",
  })
  @MaxLength(255, {
    message: "面板名称不能大于255字符",
  })
  name: string;
}

export class PutBoardInfo {
  @ValidateIf((o) => o.name !== undefined)
  @MaxLength(255, {
    message: "面板名称不能大于255字符",
  })
  name?: string;
}

export async function getAndVaildBoardID(
  id: number,
  userid: number
): Promise<BoardModel> {
  let board = await BoardModel.findByPk(id);
  if (!board) {
    throw Boom.notFound("该面板不存在");
  }
  if (board.userId !== userid) {
    throw Boom.forbidden("面板无法访问");
  }

  return board;
}
