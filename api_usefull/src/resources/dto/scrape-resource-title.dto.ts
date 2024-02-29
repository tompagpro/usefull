import { IsNotEmpty, IsUrl } from 'class-validator';

export class ScrapeResourceTitleDto {
  @IsNotEmpty()
  @IsUrl()
  url: string;
}
