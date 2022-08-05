import { IsString, IsNotEmpty, IsNumber, IsBoolean, IsOptional } from 'class-validator';
export class ReviewDto {
  @IsString()
  @IsNotEmpty()
  name: string
  
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsOptional()
  stars: number;

  @IsNumber()
  @IsOptional()
  likes: number;

  @IsBoolean()
  @IsOptional()
  visible: boolean;
}
