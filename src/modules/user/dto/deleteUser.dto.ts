import { IsNotEmpty, IsString } from "class-validator";

export class removeUserDto {
  @IsString()
  @IsNotEmpty()
  currentPassword: string;
  @IsString()
  @IsNotEmpty()
  currentLogin: string;
}