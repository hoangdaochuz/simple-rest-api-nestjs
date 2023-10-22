import { Table, Column, Model } from 'sequelize-typescript';
@Table
export class User extends Model {
  @Column
  username: string;
  @Column
  password: string;
  @Column
  firstName: string;
  @Column
  lastName: string;
  @Column
  address: string;
  @Column
  age: number;
}
