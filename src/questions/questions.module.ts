import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionsController } from './questions.controller';
import { QuestionsRepository } from './questions.repository';
import { AnswerService, QuestionsService } from './questions.service';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionsRepository])],
  controllers: [QuestionsController],
  providers: [QuestionsService, AnswerService],
})
export class QuestionsModule {}
