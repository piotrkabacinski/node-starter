import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity({ name: "todos" })
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "uuid" })
  uuid: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "bool" })
  is_done: boolean;

  @Column({ type: "timestamp" })
  created_at: Date;

  @Column({ nullable: true, type: "timestamp" })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.todos)
  user: User;
}
