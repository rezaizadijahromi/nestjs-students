import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Questions } from './questions.entity';

@Entity()
export class Lesson extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany((type) => Questions, (questions) => questions.lesson)
  questions: Questions;
}
