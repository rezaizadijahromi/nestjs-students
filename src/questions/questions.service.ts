import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQuestionDto } from './dto/questions.dto';
import { Questions } from './questions.entity';
import { QuestionsRepository } from './questions.repository';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(QuestionsRepository)
    private questionsRepository: QuestionsRepository,
  ) {}

  async getAllQuestions(): Promise<Questions[]> {
    return this.questionsRepository.find({});
  }

  async getQuestion(code: string): Promise<Questions> {
    const question = await this.questionsRepository.findOne(code);

    if (!question) {
      throw new NotFoundException(`Question with code ${code} not found`);
    }

    return question;
  }

  async createQuestion(
    createQuestionDto: createQuestionDto,
  ): Promise<Questions> {
    const { title, deadLineDate } = createQuestionDto;

    const question = new Questions();
    question.title = title;
    question.deadLineDate = deadLineDate;

    await question.save();

    return question;
  }
}
