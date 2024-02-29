import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { Repository } from 'typeorm';
import { CreateOneTagDto } from './dto/create-one-tag.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async getAllTags(user: User): Promise<Tag[]> {
    return this.tagRepository.find({ where: { user } });
  }

  async createOneTag(
    createOneTagDto: CreateOneTagDto,
    user: User,
  ): Promise<Tag> {
    const { name } = createOneTagDto;
    const tag = this.tagRepository.create({ name, user });
    await this.tagRepository.save(tag);
    return tag;
  }

  async deleteTag(id: string): Promise<void> {
    const result = await this.tagRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Ce tag n'a pas pu être trouvé.`);
    }
  }
}
