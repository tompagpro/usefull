import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Resource } from 'src/resources/resource.entity';
import { Category } from 'src/categories/category.entity';
import { Tag } from 'src/tags/tag.entity';
import { User } from 'src/auth/user.entity';

export default (configService: ConfigService): TypeOrmModuleOptions => {
  const options: TypeOrmModuleOptions = {
    type: 'postgres',
    host: configService.get('dbHost'),
    port: +configService.get<number>('port'),
    username: configService.get('dbUsername'),
    password: configService.get('dbPassword'),
    database: configService.get('dbName'),
    entities: [Resource, Category, Tag, User],
    // autoLoadEntities: true,
    synchronize: true,
  };
  return options;
};
