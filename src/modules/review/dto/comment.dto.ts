import { IsString, IsNotEmpty, IsNumber, IsBoolean, IsOptional, Max, Min } from 'class-validator';
export class CommetnDto {
  @IsString()
  comment: string;
}