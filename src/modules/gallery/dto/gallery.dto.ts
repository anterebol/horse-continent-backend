import { IsNotEmpty, IsString } from "class-validator";

export class GalleryDto {
  @IsNotEmpty()
  @IsString()
  src: string;
}