import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from './entity/answers.entity';
import { createQuestionDto } from './dto/questions.dto';
import { Lesson } from './entity/lessons.entity';
import { Master } from './entity/masters.entity';
import { Questions } from './entity/questions.entity';
import { QuestionsRepository } from './questions.repository';
import { Profile } from './entity/profile.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtPayload } from './jwt-payload.interface';
import { exception } from 'console';

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

  async createLesson(name: string, req): Promise<Lesson> {
    console.log('Lesson');
    console.log(req.user);

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

  async createAnswer(
    title: string,
    description: string,
    questionId: string,
    req,
  ) {
    const questionExist = await this.QuestionsService.getQuestion(questionId);

    console.log(req.user);

    if (!questionExist) {
      throw new NotFoundException(`Question with id: ${questionId} not found`);
    }

    const answer = new Answer();
    answer.title = title;
    answer.description = description;
    answer.questions = questionExist;

    console.log('first');

    // req.user.questionsAnswer.push(questionExist);
    console.log('second');

    // const isLiked =
    //     post.likes.filter((like) => like.user.toString() === userId).length > 0;

    const userAnswerdQuestion = questionExist.userAnswers.filter(
      (usr) => usr.id === req.user.id,
    );

    console.log(userAnswerdQuestion);

    if (!userAnswerdQuestion) {
      const newAnswer = {
        id: answer.id,
        title: answer.title,
        description: answer.description,
      } as Answer;
      questionExist.associatedAnswer.push(newAnswer);
      questionExist.userAnswers.push(req.user);
      console.log('third');

      await answer.save();
      await questionExist.save();

      return answer;
    } else {
      throw new BadRequestException('You already answerd this question');
    }
  }
}

@Injectable()
export class UserService {
  constructor(
    private QuestionsService: QuestionsService,
    private AnswerService: AnswerService,
    private jwtService: JwtService,
  ) {}

  private async hashPassword(password: string, salt: string) {
    return bcrypt.hash(password, salt);
  }

  async signUp(name: string, password: string) {
    const user = new Profile();
    user.username = name;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username is taken');
      } else {
        throw new InternalServerErrorException();
      }
    }
    return user;
  }

  async validateUserPassword(name: string, password: string) {
    const user = await Profile.findOne({ username: name });

    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      return null;
    }
  }

  async signIn(name: string, password: string) {
    const username = await this.validateUserPassword(name, password);

    if (!username) {
      throw new UnauthorizedException('Invalid Credential');
    }

    const payload: jwtPayload = { username };

    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
