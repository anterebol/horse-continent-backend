import { IsString, IsNotEmpty, IsNumber, IsBoolean, IsOptional, Max, Min } from 'class-validator';
export class ReviewDto {
  @IsString()
  @IsNotEmpty()
  name: string
  
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsOptional()
  @Max(5)
  @Min(0)
  stars: number;

  @IsNumber()
  @IsOptional()
  likes: number;

  @IsBoolean()
  @IsOptional()
  visible: boolean;
}
