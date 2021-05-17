import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { createQuestionDto } from './dto/questions.dto';
import { Lesson } from './lessons.entity';
import { Master } from './masters.entity';
import { Questions } from './questions.entity';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private questionsService: QuestionsService) {}

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
}
