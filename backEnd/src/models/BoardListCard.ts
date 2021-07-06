/*
 * @Des:
 * @Version:
 * @Author: Ellen
 * @Date: 2021-06-30 21:47:25
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-04 18:56:29
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
  HasMany,
} from "sequelize-typescript";

import { BoardList } from "./BoardList";
import { User } from "./User";
import { CardAttachment } from "./CardAttachment";
import { Comment } from "./Comment";
@Table({
  tableName: "BoardListCard",
})
export class BoardListCard extends Model<BoardListCard> {
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

  @ForeignKey(() => BoardList)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  boardListId: number;

  @AllowNull(false)
  @Unique
  @Column({
    type: DataType.STRING(255),
  })
  name: string;

  @AllowNull(false)
  @Unique
  @Column({
    type: DataType.STRING(2000),
  })
  description: string;

  @AllowNull(false)
  @Column({
    type: DataType.FLOAT,
  })
  order: number;

  @HasMany(() => CardAttachment)
  attachments: CardAttachment[];

  @HasMany(() => Comment)
  comments: Comment[];

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
