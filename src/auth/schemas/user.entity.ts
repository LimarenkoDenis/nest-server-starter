import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @Column public email: string;

  @Column public password: string;

  @Column public remember: boolean;

  @Column public name: string;

  @Column public surname: string;

}
