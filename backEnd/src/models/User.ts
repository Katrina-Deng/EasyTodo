/*
 * @Des:
 * @Version:
 * @Author: Ellen
 * @Date: 2021-06-30 21:47:25
 * @LastEditors: Ellen
 * @LastEditTime: 2021-06-30 21:56:16
 */
import {
  Model,
  Table,
  Column,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Unique,
  CreatedAt,
  UpdatedAt,
  DataType,
} from "sequelize-typescript";

import crypto from "crypto";

@Table({
  tableName: "User",
})
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Unique
  @Column({
    type: DataType.STRING(50),
  })
  name: string;

  @Column
  set password(val: string) {
    let md5 = crypto.createHash("md5");
    let newPW = md5.update(val).digest("hex");
    this.setDataValue("password", newPW);
  }

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
