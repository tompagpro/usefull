import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';
import { Category } from '../categories/category.entity';
import { Tag } from '../tags/tag.entity';
import { User } from 'src/auth/user.entity';
import { Exclude } from 'class-transformer';

@Entity()
@Unique(['url', 'user'])
export class Resource {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column()
  title: string;

  @Column()
  alreadyRead: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(() => Category, (category) => category.resources)
  category: Category;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];

  @ManyToOne(() => User, (user) => user.resources)
  @Exclude({ toPlainOnly: true })
  user: User;
}

// import {
//   Column,
//   Entity,
//   JoinTable,
//   ManyToMany,
//   ManyToOne,
//   PrimaryGeneratedColumn,
// } from 'typeorm';

// @Entity()
// export class Resource {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column()
//   url: string;

//   @Column()
//   title: string;

//   @Column()
//   comment: string;

//   @Column()
//   readed: boolean;

//   @ManyToOne(() => Category, (category) => category.resources)
//   category: Category;

//   @ManyToMany(() => Tag)
//   @JoinTable()
//   tags: Tag[];
// }
