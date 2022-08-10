import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  password: string;
  @IsString()
  @IsNotEmpty()
  currentPassword: string;
  @IsString()
  @IsNotEmpty()
  currentLogin: string;
  @IsString()
  @IsOptional()
  name: string;
  @IsString()
  @IsOptional()
  login: string;
}