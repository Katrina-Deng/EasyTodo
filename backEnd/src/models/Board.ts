/*
 * @Des:
 * @Version:
 * @Author: Ellen
 * @Date: 2021-06-30 21:47:25
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-04 21:03:05
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
  ForeignKey,
} from "sequelize-typescript";
import { User } from "./User";

@Table({
  tableName: "Board",
})
export class Board extends Model<Board> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  // 外键
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  userId: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(255),
  })
  name: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
