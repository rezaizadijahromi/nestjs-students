import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from './answers.entity';
import { createQuestionDto } from './dto/questions.dto';
import { Lesson } from './lessons.entity';
import { Master } from './masters.entity';
import { Questions } from './questions.entity';
import { QuestionsRepository } from './questions.repository';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(QuestionsRepository)
    private questionsRepository: QuestionsRepository,
  ) {}

  async getAllQuestions(): Promise<Questions[]> {
    const question = await Questions.find({
      relations: ['master', 'lesson', 'associatedAnswer'],
    });

    return question;
  }

  async getQuestion(id: string) {
    const question = await this.questionsRepository.findOne(id, {
      relations: ['master', 'lesson', 'associatedAnswer'],
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

    console.log('Lesson', lesson);
    console.log('Master', master);

    const masterName = await Master.findOne({ name: master });

    const lessonName = await Lesson.findOne({ name: lesson });
    if (masterName) {
      const question = new Questions();
      question.title = title;
      question.initiatedDate = new Date();
      question.remainingDay = remainingDay;
      const deadLine = new Date(y, m, d + remainingDay);
      question.deadLineDate = deadLine;
      question.master = masterName;
      question.lesson = lessonName;
      // question.associatedAnswer = [];

      await question.save();

      console.log(question);

      return question;
    } else {
      throw new NotFoundException('Master with this name not found');
    }

    // question.master = Master.name;
  }

  async createMaster(name: string): Promise<Master> {
    console.log('master');

    const master = new Master();
    master.name = name;

    await master.save();

    return master;
  }

  async getAllMasters(): Promise<Master[]> {
    const master = Master.find({});

    if ((await master).length === 0) {
      throw new NotFoundException('Master has no data');
    }
    return master;
  }

  async createLesson(name: string): Promise<Lesson> {
    console.log('Lesson');

    const lesson = new Lesson();
    lesson.name = name;

    await lesson.save();

    return lesson;
  }

  async getAllLessons(): Promise<Master[]> {
    const lesson = Lesson.find({});

    if ((await lesson).length === 0) {
      throw new NotFoundException('Master has no data');
    }
    return lesson;
  }
}

@Injectable()
export class AnswerService {
  constructor(public QuestionsService: QuestionsService) {}

  async getAllAnswers() {
    const answer = Answer.find({});

    if (answer) {
      return answer;
    }

    throw new NotFoundException('No answer data');
  }

  async createAnswer(title: string, description: string, questionId: string) {
    const questionExist = await this.QuestionsService.getQuestion(questionId);

    if (!questionExist) {
      throw new NotFoundException(`Question with id: ${questionId} not found`);
    }

    const answer = new Answer();
    answer.title = title;
    answer.description = description;
    answer.questions = questionExist;
    await answer.save();

    const newAnswer = {
      id: answer.id,
      title: answer.title,
      description: answer.description,
    } as Answer;
    questionExist.associatedAnswer.push(newAnswer);

    await questionExist.save();

    return answer;
  }
}
