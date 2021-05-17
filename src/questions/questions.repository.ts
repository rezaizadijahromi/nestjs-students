import { EntityRepository, Repository } from 'typeorm';
import { Questions } from './questions.entity';

@EntityRepository(Questions)
export class QuestionsRepository extends Repository<Questions> {}
