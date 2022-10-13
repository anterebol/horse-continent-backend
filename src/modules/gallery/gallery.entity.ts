import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class GalleryEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  src: string;
  @Column({default: new Date()})
  date: string;
}