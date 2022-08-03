import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  toResponse() {
    return this;
  }
}
