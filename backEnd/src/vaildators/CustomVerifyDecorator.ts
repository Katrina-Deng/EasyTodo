/*
 * @Des:自定义装饰器
 * @Version:
 * @Author: Ellen
 * @Date: 2021-06-30 23:52:55
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-01 21:03:15
 */

import {
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
} from "class-validator";

//  @IsSameValue("password", { message: "两次密码不一致",})
/**
 * property:  password...
 * vaildateOptions { message: "两次密码不一致",} ...
 */
export function IsSameValue(
  property: string,
  vaildateOptions?: ValidationOptions
) {
  // 属性装饰器 第一个是构造函数（实例来说是原型对象），第二是成员的名字（属性名）
  return function (target: Object, propertyName: string) {
    registerDecorator({
      name: "IsSameValue",
      target: target.constructor,
      propertyName,
      //   约束；限制；约束条件（constraint的复数形式）
      constraints: [property],
      options: vaildateOptions,
      validator: {
        //   value: any, rePw value
        validate(
          value: any,
          validationArguments?: ValidationArguments | undefined
        ): boolean | Promise<boolean> {
          // 获取指定名称的属性值
          // (validationArguments.object as any)[property]  用户输入的PW value
          let valueVaild =
            validationArguments &&
            (validationArguments.object as any)[property];
          return valueVaild === value;
        },
      },
    });
  };
}
