/*
 * @Des:
 * @Version:
 * @Author: Ellen
 * @Date: 2021-06-30 21:47:25
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-04 18:53:54
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
} from "sequelize-typescript";
import { User } from "./User";

@Table({
  tableName: "Attachment",
})
export class Attachment extends Model<Attachment> {
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
  @Default("")
  @Column({
    type: DataType.STRING(255),
  })
  originName: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(255),
  })
  name: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(50),
  })
  type: string;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.INTEGER,
  })
  size: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
