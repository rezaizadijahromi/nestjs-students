import { EntityRepository, Repository } from 'typeorm';
import { Questions } from './entitys/questions.entity';

@EntityRepository(Questions)
export class QuestionsRepository extends Repository<Questions> {}
