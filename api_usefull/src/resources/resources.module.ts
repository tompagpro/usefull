import { Module } from '@nestjs/common';
import { ResourcesController } from './resources.controller';
import { ResourcesService } from './resources.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resource } from './resource.entity';
import { Tag } from 'src/tags/tag.entity';
import { Category } from 'src/categories/category.entity';
import { ScrapingService } from 'src/handler/scraping.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Resource, Tag, Category]), AuthModule],
  controllers: [ResourcesController],
  providers: [ResourcesService, ScrapingService],
})
export class ResourcesModule {}
