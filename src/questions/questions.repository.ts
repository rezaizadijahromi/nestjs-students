import { EntityRepository, Repository } from 'typeorm';
import { Questions } from './entity/questions.entity';

@EntityRepository(Questions)
export class QuestionsRepository extends Repository<Questions> {}
