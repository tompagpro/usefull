import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
  Unique,
} from 'typeorm';
import { Resource } from '../resources/resource.entity';
import { User } from 'src/auth/user.entity';
import { Exclude } from 'class-transformer';

@Entity()
@Unique(['name', 'user'])
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Resource, (resource) => resource.tags)
  @JoinTable()
  resources: Resource[];

  @ManyToOne(() => User, (user) => user.tags)
  @Exclude({ toPlainOnly: true })
  user: User;
}
