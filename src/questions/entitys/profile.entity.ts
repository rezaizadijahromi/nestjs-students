import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Questions } from './questions.entity';

@Entity()
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne((type) => Questions, (question) => question.userAnswerQuestion, {
    eager: true,
  })
  userReply: Questions;

  //  @ManyToOne((type) => Questions, (question) => question.userLikes)
  //   likes: Questions;
}
