import { Column, Entity } from 'typeorm';

@Entity()
export class User {
  @Column() public email: string;

  @Column() public password: string;

  @Column() public remember: boolean;

  @Column() public name: string;

  @Column() public surname: string;
}
