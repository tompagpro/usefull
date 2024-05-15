import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { CategoryWithToRead } from './categoryWithToRead.interface';

@Controller('categories')
@UseGuards(AuthGuard('jwt'))
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getallCategories(@GetUser() user: User): Promise<Category[]> {
    return this.categoriesService.getAllCaterogies(user);
  }

  @Get('toread')
  getCategoriesWithToRead(
    @GetUser() user: User,
  ): Promise<CategoryWithToRead[]> {
    return this.categoriesService.getCategoriesWithToRead(user);
  }

  @Post()
  createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
    @GetUser() user: User,
  ): Promise<Category> {
    return this.categoriesService.createCategory(createCategoryDto, user);
  }

  @Delete('/:id')
  deleteCategory(@Param() id: string): void {
    this.categoriesService.deleteCategory(id);
  }
}
