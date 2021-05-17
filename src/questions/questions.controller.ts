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
import { Questions } from './questions.entity';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private questionsService: QuestionsService) {}

  @Get()
  getAllQuestions() {
    return this.questionsService.getAllQuestions();
  }

  @Get('/:code')
  getQuestion(@Param('code') code: string): Promise<Questions> {
    return this.questionsService.getQuestion(code);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createQuestion(
    @Body() createQuestionDto: createQuestionDto,
  ): Promise<Questions> {
    return this.questionsService.createQuestion(createQuestionDto);
  }
}
