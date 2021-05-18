import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Questions } from './questions.entity';
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['username'])
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @ManyToOne((type) => Questions, (question) => question.userAnswers, {
    eager: false,
  })
  questionsAnswer: Questions[];

  async validatePassword(password: string) {
    const hash = await bcrypt.hash(password, this.salt);

    return hash === this.password;
  }
}
