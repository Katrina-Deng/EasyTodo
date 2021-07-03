/*
 * @Des:
 * @Version:
 * @Author: Ellen
 * @Date: 2021-06-30 21:47:25
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-01 17:56:55
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
  Default,
} from "sequelize-typescript";

@Table({
  tableName: "CardAttachment",
})
export class CardAttachment extends Model<CardAttachment> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  // 外键
  userId: number;
  // 外键
  boardListCardId: number;
  // 外键
  attachmentId: number;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.BOOLEAN,
  })
  isCover: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
