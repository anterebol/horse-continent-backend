import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EventEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  date: string;
  @Column()
  description: string;
  @Column()
  img: string;
  @Column()
  order: number;
  @Column({default: true})
  was: boolean;
  @Column({default: true})
  visible: boolean;
}