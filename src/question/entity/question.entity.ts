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

import { Master } from '../../master-lesson/entity/master.entity';
import { Lesson } from '../../master-lesson/entity/lesson.entity';
import { Answer } from 'src/answer/entity/answers.entity';
// import { Answer } from './answers.entity';
// import { Profile } from './profile.entity';

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

  // @OneToMany((type) => User, (user) => user.likes)
  // @OneToMany((type) => Profile, (profile) => profile.questionsAnswer)
  // userAnswers: Profile[];
  //   userLikes: User[];
}
