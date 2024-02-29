import { Module } from '@nestjs/common';
import { ResourcesModule } from './resources/resources.module';
import { CategoriesModule } from './categories/categories.module';
import { TagsModule } from './tags/tags.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import database from './config/database.config';
import jwt from './config/jwt.config';
import TypeOrmConfig from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [database, jwt] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: TypeOrmConfig,
      inject: [ConfigService],
    }),
    ResourcesModule,
    CategoriesModule,
    TagsModule,
    AuthModule,
  ],
})
export class AppModule {}
