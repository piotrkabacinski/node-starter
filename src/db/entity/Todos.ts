import { Column, Entity, Generated, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./Users";

@Entity()
export class Todos {
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

  @ManyToOne(() => Users, (user) => user.todos)
  user: Users;
}
