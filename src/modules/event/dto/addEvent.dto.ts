import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class AddEventDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsOptional()
  date: string;
  @IsString()
  @IsOptional()
  description: string;
  @IsString()
  @IsOptional()
  img: string;
  @IsNumber()
  @IsOptional()
  order: number;
  @IsBoolean()
  @IsOptional()
  was: boolean;
  @IsBoolean()
  @IsOptional()
  visible: boolean;
}