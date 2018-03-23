import { Column, DataType, Length, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model<User> {

  @Length({min: 3, max: 20, msg: 'wrong length'})
  @Column(DataType.STRING)
  public email: string;

  @Length({min: 1, max: 20, msg: 'wrong length'})
  @Column(DataType.STRING)
  public password: string;

  @Column public remember: boolean;

  @Column public name: string;

  @Column public surname: string;
}
