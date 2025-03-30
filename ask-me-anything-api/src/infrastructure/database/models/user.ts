import {
  AllowNull,
  Column,
  DataType,
  Default,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

@Table({
  paranoid: true,
  timestamps: true,
})
export class UserModel extends Model {
  /* 🔑 Identifiers. */
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  /* 🗃️ Rest. */
  @AllowNull(false)
  @Column(DataType.STRING)
  avatar: string = '';

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string = '';

  @AllowNull(false)
  @Column(DataType.STRING)
  password: string = '';

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  username: string = '';
};