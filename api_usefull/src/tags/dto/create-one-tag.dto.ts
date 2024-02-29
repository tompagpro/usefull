import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOneTagDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
