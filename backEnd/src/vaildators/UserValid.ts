/*
 * @Des: 用户验证
 * @Version:
 * @Author: Ellen
 * @Date: 2021-06-30 22:52:19
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-01 00:07:41
 */
import { Length, IsNotEmpty } from "class-validator";
import { IsSameValue } from "./CustomVerifyDecorator";

export class RegisterVaild {
  @Length(5, 50, {
    message: "用户名不能为空或用户名必须大于5个字符且小于50个字符",
  })
  name: string;

  @IsNotEmpty({
    message: "密码不能为空",
  })
  password: string;

  @IsSameValue("password", {
    message: "两次密码不一致",
  })
  rePassword: string;
}
