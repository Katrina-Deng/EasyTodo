/*
 * @Des:
 * @Version:
 * @Author: Ellen
 * @Date: 2021-06-30 21:47:25
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-01 17:57:47
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
  tableName: "Comment",
})
export class Comment extends Model<Comment> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  // 外键
  userId: number;
  // 外键
  boardListCardId: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(2000),
  })
  content: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
