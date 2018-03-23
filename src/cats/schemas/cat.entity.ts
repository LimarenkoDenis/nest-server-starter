import { Column, Entity } from 'typeorm';

@Entity()
export class Cat {
  @Column() public name: string;

  @Column() public age: number;

  @Column() public breed: string;
}
