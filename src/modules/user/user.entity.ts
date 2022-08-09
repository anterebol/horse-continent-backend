import { IsOptional } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column()
  login: string;
  @Column()
  password: string;
  @Column()
  name: string;
  @Column({
    default: 'admin'
  })
  role: string;
  toResponse() {
    return { login: this.login, id: this.id, name: this.name, role: this.role };
  }
}