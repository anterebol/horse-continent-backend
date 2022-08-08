import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsString()
  @IsOptional()
  name: string;
}