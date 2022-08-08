import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class AuthEntity{
  @PrimaryColumn()
  login: string
  @Column()
  password: string
}