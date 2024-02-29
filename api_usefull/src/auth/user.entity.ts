import { Category } from 'src/categories/category.entity';
import { Resource } from 'src/resources/resource.entity';
import { Tag } from 'src/tags/tag.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany((/*Type*/) => Resource, (resource) => resource.user)
  resources: Resource[];

  @OneToMany(() => Category, (category) => category.user)
  categories: Category[];

  @OneToMany(() => Tag, (tag) => tag.user)
  tags: Tag[];
}
