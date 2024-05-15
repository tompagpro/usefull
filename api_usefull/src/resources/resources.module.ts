import { Module } from '@nestjs/common';
import { ResourcesController } from './resources.controller';
import { ResourcesService } from './resources.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resource } from './resource.entity';
import { Tag } from '../tags/tag.entity';
import { Category } from '../categories/category.entity';
import { ScrapingService } from '../handler/scraping.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Resource, Tag, Category]), AuthModule],
  controllers: [ResourcesController],
  providers: [ResourcesService, ScrapingService],
})
export class ResourcesModule {}
