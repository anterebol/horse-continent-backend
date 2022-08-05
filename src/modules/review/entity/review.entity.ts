import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm';

@Entity('review')
export class ReviewEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column({
    default: 5,
  })
  stars: number;
  @Column({
    default: 0
  })
  likes: number;
  @Column({
    default: true
  })
  visible: boolean;
}
