import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Brackets, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { User } from 'src/auth/user.entity';
import { CategoryWithToRead } from './categoryWithToRead.interface';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getAllCaterogies(user: User): Promise<Category[]> {
    return this.categoryRepository.find({ where: { user } });
  }

  async getCategoriesWithToRead(user: User): Promise<CategoryWithToRead[]> {
    const categories = await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoin('category.resources', 'resource')
      .select(['category', 'resource.alreadyRead'])
      .where('resource.user.id = :userId', { userId: user.id })
      .andWhere(
        new Brackets((qb) => {
          qb.where('resource.alreadyRead = :alreadyRead', {
            alreadyRead: false,
          }).orWhere('resource.id IS NULL');
        }),
      )
      .getMany();

    const categoriesWithToRead = categories.map((categorie) => {
      return {
        id: categorie.id,
        name: categorie.name,
        toRead: categorie.resources.length,
      };
    });
    return categoriesWithToRead;
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
    user: User,
  ): Promise<Category> {
    const { name } = createCategoryDto;
    const category = this.categoryRepository.create({ name, user });
    try {
      await this.categoryRepository.save(category);
      return category;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(
          `La catégorie ${category.name} existe déjà !`,
        );
      } else {
        throw new InternalServerErrorException(
          'Oups, un problème est survenu !',
        );
      }
    }
  }

  async deleteCategory(id: string): Promise<void> {
    const result = await this.categoryRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Cette catégorie n'a pas pu être trouvée.`);
    }
  }
}
