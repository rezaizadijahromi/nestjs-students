import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Master } from './masters.entity';
import { Lesson } from './lessons.entity';
import { Answer } from './answers.entity';
import { Profile } from './profile.entity';

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

  @OneToMany((type) => Answer, (answer) => answer.questions)
  associatedAnswer: Answer[];

  @OneToMany((type) => Profile, (profile) => profile.questionsAnswer)
  userAnswers: Profile[];
  //   @OneToMany((type) => User, (user) => user.likes)
  //   userLikes: User[];
}
