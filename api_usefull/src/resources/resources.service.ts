import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resource } from './resource.entity';
import { Tag } from '../tags/tag.entity';
import { Category } from '../categories/category.entity';
import { CreateResourceDto } from './dto/create-resource.dto';
import { ScrapingService } from 'src/handler/scraping.service';
import { ScrapeResourceTitleDto } from './dto/scrape-resource-title.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(Resource)
    private readonly resourceRepository: Repository<Resource>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly scrapingService: ScrapingService,
  ) {}

  async getAllResources(user: User): Promise<Resource[]> {
    return await this.resourceRepository.find({
      where: { user },
      relations: { tags: true, category: true },
    });
  }

  // async getRessourcesByCategory(categoryId: number): Promise<Resource[]> {
  //   return this.resourceRepository.find({
  //     where: { category: { id: categoryId } },
  //   });
  // }

  async createResource(
    createResourceDto: CreateResourceDto,
    user: User,
  ): Promise<Resource> {
    const { url, tags, category, title, alreadyRead } = createResourceDto;
    const tagsEntities = await this.findOrCreateTags(tags, user);
    try {
      const categoryEntity = await this.categoryRepository.findOneOrFail({
        where: { user, name: category },
      });
      const resource: Resource = this.resourceRepository.create({
        user,
        url,
        title,
        alreadyRead: alreadyRead === 'true' ? true : false,
        tags: tagsEntities,
        category: categoryEntity,
      });
      return await this.resourceRepository.save(resource);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(`La ressource ${url} existe déjà !`);
      } else if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(
          `La catégorie ${category} n'a pas pu être trouvée.`,
        );
      } else {
        throw new InternalServerErrorException(
          'Oups, un problème est survenu !',
        );
      }
    }
  }

  private async findOrCreateTags(
    tagNames: Array<string>,
    user: User,
  ): Promise<Tag[]> {
    const tags: Tag[] = [];
    for (const tagName of tagNames) {
      let tag: Tag = await this.tagRepository.findOneBy({
        name: tagName,
      });

      if (!tag) {
        tag = this.tagRepository.create({ name: tagName, user });
        tag = await this.tagRepository.save(tag);
      }
      tags.push(tag);
    }
    return tags;
  }

  async deleteResource(id: string) {
    const result = await this.resourceRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Cette ressource n'a pas pu être trouvée.`);
    }
  }

  async scrapeTitleFromUrl(
    scrapeResourceTitleDto: ScrapeResourceTitleDto,
  ): Promise<string | null> {
    const title = await this.scrapingService.scrapeTitleFromUrl(
      scrapeResourceTitleDto.url,
    );
    return title;
  }
}
