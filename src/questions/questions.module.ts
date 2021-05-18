import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionsController, UsersController } from './questions.controller';
import { QuestionsRepository } from './questions.repository';
import {
  AnswerService,
  QuestionsService,
  UserService,
} from './questions.service';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionsRepository])],
  controllers: [QuestionsController, UsersController],
  providers: [QuestionsService, AnswerService, UserService],
})
export class QuestionsModule {}
