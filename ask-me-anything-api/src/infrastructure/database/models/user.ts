import {
  AllowNull,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
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
  @Default('')
  @Column(DataType.STRING)
  declare avatar: string;

  @AllowNull(false)
  @Default('')
  @Column(DataType.STRING)
  declare name: string;

  @AllowNull(false)
  @Default('')
  @Column(DataType.STRING)
  declare password: string;

  @AllowNull(false)
  @Default('')
  @Column(DataType.STRING)
  declare username: string;
};