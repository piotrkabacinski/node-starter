import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Todo } from "./Todo";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ type: "timestamp" })
  created_at: Date;

  @OneToMany(() => Todo, ({ user }) => user)
  todos: Todo[];
}
