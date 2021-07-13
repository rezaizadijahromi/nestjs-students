import { Module } from '@nestjs/common';
import { MasterLessonService } from './master-lesson.service';
import { MasterLessonController } from './master-lesson.controller';

@Module({
  providers: [MasterLessonService],
  controllers: [MasterLessonController]
})
export class MasterLessonModule {}
