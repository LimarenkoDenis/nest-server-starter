import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn() public id: number;

  @Column() public email: string;

  @Column() public password: string;

  @Column() public remember: boolean;

  @Column() public name: string;

  @Column() public surname: string;
}
