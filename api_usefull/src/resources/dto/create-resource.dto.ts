import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsNotEmpty,
  IsUrl,
} from 'class-validator';
// import { Category } from 'src/categories/category.entity';

export class CreateResourceDto {
  @IsNotEmpty()
  @IsUrl()
  url: string;

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  alreadyRead: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  tags: Array<string>;
}
