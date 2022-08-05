import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm';

@Entity('review')
export class ReviewEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  stars: number;
  @Column()
  likes: number;
  @Column()
  visible: boolean;
}
