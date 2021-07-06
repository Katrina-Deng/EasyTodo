/*
 * @Des:
 * @Version:
 * @Author: Ellen
 * @Date: 2021-06-30 21:47:25
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-04 18:58:08
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
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "./User";
import { BoardListCard } from "./BoardListCard";
@Table({
  tableName: "Comment",
})
export class Comment extends Model<Comment> {
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

  @BelongsTo(() => User)
  user: User;
  // 外键
  @ForeignKey(() => BoardListCard)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
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
