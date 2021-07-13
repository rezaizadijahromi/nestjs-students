import { Module } from '@nestjs/common';
import { QuestionModule } from 'src/question/question.module';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';

@Module({
  controllers: [AnswerController],
  providers: [AnswerService],
  imports: [QuestionModule],
})
export class AnswerModule {}
