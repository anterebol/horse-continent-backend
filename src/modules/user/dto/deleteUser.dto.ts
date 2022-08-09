import { IsNotEmpty, IsString } from "class-validator";

export class removeUserDto {
  @IsString()
  @IsNotEmpty()
  password: string;
}