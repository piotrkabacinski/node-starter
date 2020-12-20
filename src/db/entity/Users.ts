import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Todos } from "./Todos";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @OneToMany(() => Todos, ({ user }) => user)
  todos: Todos[];
}
