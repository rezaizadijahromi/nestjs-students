import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Master } from './masters.entity';
import { Lesson } from './lessons.entity';

@Entity()
export class Questions extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  title: string;

  @ManyToOne((type) => Lesson, (lesson) => lesson.name)
  lesson: Lesson;

  @ManyToOne((type) => Master, (master) => master.name)
  master: Master;

  @Column()
  initiatedDate: Date;

  @Column()
  deadLineDate: Date;

  @Column()
  remainingDay: number;

  //   @Column()
  //   associatedAnswer:
}
