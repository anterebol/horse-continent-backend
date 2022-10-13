import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateOrderDto {
  @IsString()
  @IsNotEmpty()
  id: string
  @IsNumber()
  @IsNotEmpty()
  order: number

}