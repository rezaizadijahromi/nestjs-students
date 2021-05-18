import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { createQuestionDto } from './dto/questions.dto';
import { GetUser } from './get-user.decorators';
import { Lesson } from './lessons.entity';
import { Master } from './masters.entity';
import { Questions } from './questions.entity';
import {
  AnswerService,
  QuestionsService,
  UserService,
  // UserService,
} from './questions.service';
import { Profile } from './profile.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard())
@Controller('questions')
export class QuestionsController {
  constructor(
    private questionsService: QuestionsService,
    private AnswerService: AnswerService,
    private userService: UserService,
  ) {}

  @Get('/master')
  getAllMaster(): Promise<Master[]> {
    return this.questionsService.getAllMasters();
  }

  @Get('/lesson')
  getAllLesson(): Promise<Lesson[]> {
    return this.questionsService.getAllLessons();
  }

  @Get()
  getAllQuestions() {
    return this.questionsService.getAllQuestions();
  }

  @Get('/answer')
  getAllAnswers() {
    return this.AnswerService.getAllAnswers();
  }

  @Get('/:code')
  getQuestion(@Param('id') id: string) {
    return this.questionsService.getQuestion(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createQuestion(
    @Body() createQuestionDto: createQuestionDto,
    @Body('master') master: Master,
    @Body('lesson') lesson: Lesson,
  ): Promise<Questions> {
    return this.questionsService.createQuestion(
      createQuestionDto,
      master,
      lesson,
    );
  }

  @Post('/master')
  createMaster(@Body('name') name: string) {
    return this.questionsService.createMaster(name);
  }

  @Post('/lesson')
  createLesson(@Req() req: Profile, @Body('name') name: string) {
    return this.questionsService.createLesson(name, req);
  }

  @Post('/:id/answer')
  createAnswer(
    @Req() req: Profile,
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
  ) {
    const answer = this.AnswerService.createAnswer(title, description, id, req);

    return answer;
  }
}

@Controller('users')
export class UsersController {
  constructor(
    private questionsService: QuestionsService,
    private AnswerService: AnswerService,
    private userService: UserService,
  ) {}

  @Post('/signin')
  getUser(@Body('name') name: string, @Body('password') password: string) {
    return this.userService.signIn(name, password);
  }

  @Post('/signup')
  createUser(@Body('name') name: string, @Body('password') password: string) {
    return this.userService.signUp(name, password);
  }
}
