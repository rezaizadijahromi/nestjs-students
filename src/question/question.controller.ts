import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Lesson } from 'src/master-lesson/entity/lesson.entity';
import { Master } from 'src/master-lesson/entity/master.entity';
import { createQuestionDto } from './dto/question.dto';
import { Questions } from './entity/question.entity';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @Get()
  getAllQuestions() {
    return this.questionService.getAllQuestions();
  }

  @Get('/:code')
  getQuestion(@Param('id') id: string) {
    return this.questionService.getQuestion(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createQuestion(
    @Body() createQuestionDto: createQuestionDto,
    @Body('master') master: Master,
    @Body('lesson') lesson: Lesson,
  ): Promise<Questions> {
    return this.questionService.createQuestion(
      createQuestionDto,
      master,
      lesson,
    );
  }
}
