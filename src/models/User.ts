import {
  AllowNull,
  BeforeCreate,
  BeforeUpdate,
  Column,
  DataType,
  Model,
  Table,
  Unique,
} from "sequelize-typescript";
import bcrypt from "bcrypt";

const SALT_ROUNDS = Number(process.env.SALTROUNDS || 10);

@Table({
  tableName: "users",
})
export class User extends Model {
  @AllowNull(false)
  @Unique(true)
  @Column({
    type: DataType.STRING,
  })
  "username": string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  "password": string;

  @BeforeCreate
  static hashPasswordBeforeCreate(user: User) {
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    user.password = bcrypt.hashSync(user.password, salt);
  }

  @BeforeUpdate
  static hashPasswordBeforeUpdate(user: User) {
    if (user.password) {
      const salt = bcrypt.genSaltSync(SALT_ROUNDS);
      user.password = bcrypt.hashSync(user.password, salt);
    }
  }
}
