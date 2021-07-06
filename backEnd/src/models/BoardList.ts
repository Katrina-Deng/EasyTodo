/*
 * @Des:
 * @Version:
 * @Author: Ellen
 * @Date: 2021-06-30 21:47:25
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-04 21:49:45
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
import { Board } from "./Board";
import { User } from "./User";
@Table({
  tableName: "BoardList",
})
export class BoardList extends Model<BoardList> {
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

  // 外键
  @ForeignKey(() => Board)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  boardId: number;

  @AllowNull(false)
  // @Unique
  @Column({
    type: DataType.STRING(255),
  })
  name: string;

  @AllowNull(false)
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    defaultValue: 0,
  })
  order: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
