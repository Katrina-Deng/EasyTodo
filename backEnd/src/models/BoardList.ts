/*
 * @Des:
 * @Version:
 * @Author: Ellen
 * @Date: 2021-06-30 21:47:25
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-01 17:51:45
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
  tableName: "BoardList",
})
export class BoardList extends Model<BoardList> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  // 外键
  userId: number;

  // 外键
  boardId: number;

  @AllowNull(false)
  @Unique
  @Column({
    type: DataType.STRING(255),
  })
  name: string;

  @AllowNull(false)
  @Column({
    type: DataType.FLOAT,
  })
  order: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
