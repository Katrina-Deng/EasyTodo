/*
 * @Des:
 * @Version:
 * @Author: Ellen
 * @Date: 2021-07-10 14:46:51
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-10 17:08:16
 */
import {
  IsNotEmpty,
  IsNumber,
  MaxLength,
  Min,
  ValidateIf,
  IsNumberString,
} from "class-validator";

export class postCommentBody {
  @IsNumber(
    {},
    {
      message: "卡片id不能为空且必须数字",
    }
  )
  boardListCardId: number;

  @IsNotEmpty({
    message: "评论不能为空",
  })
  @MaxLength(2000, {
    message: "评论不能超过2000字",
  })
  content: string;
}

export class getCommentBody {
  @IsNumberString(
    {},
    {
      message: "卡片id不能为空且必须数字",
    }
  )
  boardListCardId: number;
  @ValidateIf((o) => o.page !== undefined)
  @IsNumberString(
    {},
    {
      message: "页面不能为空且必须数字",
    }
  )
  page: number;
}
