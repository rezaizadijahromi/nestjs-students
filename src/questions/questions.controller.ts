import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Res,
  Response,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { createQuestionDto } from './dto/questions.dto';
import { Lesson } from './lessons.entity';
import { Master } from './masters.entity';
import { Questions } from './questions.entity';
import { AnswerService, QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(
    private questionsService: QuestionsService,
    private AnswerService: AnswerService,
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
  createLesson(@Body('name') name: string) {
    return this.questionsService.createLesson(name);
  }

  @Post('/:id/answer')
  createAnswer(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
  ) {
    const answer = this.AnswerService.createAnswer(title, description, id);

    return answer;
  }
}
