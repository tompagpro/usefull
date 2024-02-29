import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { Resource } from './resource.entity';
import { ScrapeResourceTitleDto } from './dto/scrape-resource-title.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('resources')
@UseGuards(AuthGuard('jwt'))
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Get()
  getAllResources(@GetUser() user: User) {
    console.log(user.username);
    return this.resourcesService.getAllResources(user);
  }

  // @Get('by-category/:categoryId')
  // findAllByCategory(
  //   @Param('categoryId') categoryId: string,
  // ): Promise<Resource[]> {
  //   return this.resourcesService.getRessourcesByCategory(
  //     parseInt(categoryId, 10),
  //   );
  // }

  @Post()
  createResource(
    @Body() createResourceDto: CreateResourceDto,
    @GetUser() user: User,
  ): Promise<Resource> {
    console.log(user.username);
    return this.resourcesService.createResource(createResourceDto, user);
  }

  @Delete('/:id')
  deleteResource(@Param() id: string): void {
    this.resourcesService.deleteResource(id);
  }

  @Post('scrape')
  scrapeResource(
    @Body() scrapeResourceTitleDto: ScrapeResourceTitleDto,
  ): Promise<string | null> {
    return this.resourcesService.scrapeTitleFromUrl(scrapeResourceTitleDto);
  }
}
