import { IsBoolean } from 'class-validator';

export class UpdateResourceReadStatusDto {
  @IsBoolean()
  alreadyRead: boolean;
}
