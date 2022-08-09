import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;
  @IsString()
  @IsOptional()
  currentPassword: string;
  @IsString()
  @IsOptional()
  name: string;
  @IsString()
  @IsOptional()
  login: string;
}