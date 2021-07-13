import { Injectable, NotFoundException } from '@nestjs/common';
import { Lesson } from 'src/master-lesson/entity/lesson.entity';
import { Master } from 'src/master-lesson/entity/master.entity';
import { createQuestionDto } from './dto/question.dto';
import { Questions } from './entity/question.entity';

@Injectable()
export class QuestionService {
  constructor(public questionService: QuestionService) {}

  async getAllQuestions(): Promise<Questions[]> {
    const question = await Questions.find({
      relations: ['master', 'lesson', 'associatedAnswer'],
    });

    return question;
  }

  async getQuestion(id: string) {
    const question = await Questions.findOne(id, {
      relations: ['master', 'lesson', 'associatedAnswer', 'userAnswers'],
    });

    if (!question) {
      throw new NotFoundException(`Question with id ${id} not found`);
    }

    return question;
  }

  async createQuestion(
    createQuestionDto: createQuestionDto,
    master,
    lesson,
  ): Promise<Questions> {
    const { title, remainingDay } = createQuestionDto;

    const date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth(),
      d = date.getDate();

    const masterName = await Master.findOne({ name: master });
    const lessonName = await Lesson.findOne({ name: lesson });

    if (masterName && lessonName) {
      const question = new Questions();
      question.title = title;
      question.initiatedDate = new Date();
      question.remainingDay = remainingDay;

      // calculate the remain day for output to user
      const deadLine = new Date(y, m, d + remainingDay);
      question.deadLineDate = deadLine;

      // assing master and lesson name's to question obj
      question.master = masterName;
      question.lesson = lessonName;

      await question.save();

      return question;
    } else {
      throw new NotFoundException('Master with this name not found');
    }
  }
}
