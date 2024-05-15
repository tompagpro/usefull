import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  Unique,
} from 'typeorm';
import { Resource } from '../resources/resource.entity';
import { User } from '../auth/user.entity';
import { Exclude } from 'class-transformer';

@Entity()
@Unique(['name', 'user'])
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Resource, (resource) => resource.category)
  resources: Resource[];

  @ManyToOne(() => User, (user) => user.categories)
  @Exclude({ toPlainOnly: true })
  user: User;
}
