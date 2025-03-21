import {
  AllowNull,
  Column,
  DataType,
  Default,
  Model,
  Table,
} from "sequelize-typescript";

@Table({
  tableName: "todo",
})
export class Todo extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.STRING({ length: 100 }),
  })
  "title": string;

  @AllowNull(false)
  @Column({
    type: DataType.TEXT,
  })
  "description": string;

  @Default(1)
  @Column({
    type: DataType.TINYINT({
      length: 1,
    }),
  })
  "complete": number;
}
