import {
  Column,
  Entity,
  Generated,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity({ name: "todos" })
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated("uuid")
  uuid: string;

  @Column()
  description: string;

  @Column()
  isDone: boolean;

  @Column({ nullable: true, type: "timestamp" })
  created: Date;

  @Column({ nullable: true, type: "timestamp" })
  updated: Date;

  @ManyToOne(() => User, (user) => user.todos)
  user: User;
}
