import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionsController, UsersController } from './questions.controller';
import { QuestionsRepository } from './questions.repository';
import {
  AnswerService,
  QuestionsService,
  UserService,
} from './questions.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([QuestionsRepository]),
  ],
  controllers: [QuestionsController, UsersController],
  providers: [QuestionsService, AnswerService, UserService],
  exports: [PassportModule],
})
export class QuestionsModule {}
