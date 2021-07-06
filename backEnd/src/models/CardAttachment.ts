/*
 * @Des:
 * @Version:
 * @Author: Ellen
 * @Date: 2021-06-30 21:47:25
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-04 18:57:15
 */
import {
  Model,
  Table,
  Column,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Unique,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
  DataType,
  Default,
} from "sequelize-typescript";
import { User } from "./User";
import { BoardListCard } from "./BoardListCard";
import { Attachment } from "./Attachment";
@Table({
  tableName: "CardAttachment",
})
export class CardAttachment extends Model<CardAttachment> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  userId: number;

  @ForeignKey(() => BoardListCard)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  boardListCardId: number;

  @ForeignKey(() => Attachment)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
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
