/*
 * @Des:
 * @Version:
 * @Author: Ellen
 * @Date: 2021-06-30 21:47:25
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-01 17:50:49
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

@Table({
  tableName: "Board",
})
export class Board extends Model<Board> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  // 外键
  userId: number;

  @AllowNull(false)
  @Unique
  @Column({
    type: DataType.STRING(255),
  })
  name: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
