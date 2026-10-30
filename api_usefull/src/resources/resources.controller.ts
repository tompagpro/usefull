import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { Resource } from './resource.entity';
import { ScrapeResourceTitleDto } from './dto/scrape-resource-title.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { UpdateResourceReadStatusDto } from './dto/update-resource-read-status.dto';
// import { Tag } from 'src/tags/tag.entity';

@Controller('resources')
@UseGuards(AuthGuard('jwt'))
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Get()
  getAllResources(@GetUser() user: User): Promise<Resource[]> {
    return this.resourcesService.getAllResources(user);
  }

  // Get USER ???
  @Get('/category/:categoryId')
  getAllByCategory(
    @Param('categoryId') categoryId: string,
  ): Promise<Resource[]> {
    return this.resourcesService.getRessourcesByCategory(categoryId);
  }

  @Get('/tag/:tagId')
  getAllByTag(
    @GetUser() user: User,
    @Param('tagId') tagId: string,
  ): Promise<Resource[]> {
    return this.resourcesService.getResourcesByTag(user, tagId);
  }

  @Get('/:id')
  getResourceById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Resource> {
    return this.resourcesService.getResourceById(id, user);
  }

  @Post()
  createResource(
    @Body() createResourceDto: CreateResourceDto,
    @GetUser() user: User,
  ): Promise<Resource> {
    return this.resourcesService.createResource(createResourceDto, user);
  }

  @Delete('/:id')
  deleteResource(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<void> {
    console.log('bien ici delete');
    return this.resourcesService.deleteResource(id, user);
  }

  @Post('/:id')
  updateResource(
    @Param('id') id: string,
    @Body() updateResourceDto: UpdateResourceDto,
    @GetUser() user: User,
  ): Promise<Resource> {
    return this.resourcesService.updateResource(updateResourceDto, id, user);
  }

  @Patch('/:id/read')
  updateReadStatus(
    @Param('id') id: string,
    @Body() updateResourceReadStatusDto: UpdateResourceReadStatusDto,
    @GetUser() user: User,
  ): Promise<Resource> {
    return this.resourcesService.updateReadStatus(
      id,
      updateResourceReadStatusDto.alreadyRead,
      user,
    );
  }

  @Post('/scrape/getTitle')
  scrapeResource(
    @Body() scrapeResourceTitleDto: ScrapeResourceTitleDto,
  ): Promise<{ title: string } | null> {
    return this.resourcesService.scrapeTitleFromUrl(scrapeResourceTitleDto);
  }
}
