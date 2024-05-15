import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { Tag } from './tag.entity';
import { CreateOneTagDto } from './dto/create-one-tag.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('tags')
@UseGuards(AuthGuard('jwt'))
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  getAllTags(@GetUser() user: User): Promise<Tag[]> {
    return this.tagsService.getAllTags(user);
  }

  @Post()
  createOneTag(
    @Body() createOneTagDto: CreateOneTagDto,
    @GetUser() user: User,
  ): Promise<Tag> {
    return this.tagsService.createOneTag(createOneTagDto, user);
  }

  @Delete('/:id')
  deleteTag(@Param() id: string): void {
    this.tagsService.deleteTag(id);
  }
}
