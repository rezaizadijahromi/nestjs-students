import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { response } from 'express';
import { Lesson } from './entity/lesson.entity';
import { Master } from './entity/master.entity';
import { MasterLessonService } from './master-lesson.service';

@Controller('master-lesson')
export class MasterLessonController {
  constructor(private masterLessonService: MasterLessonService) {}

  @Get('/master')
  getAllMaster(): Promise<Master[]> {
    const master = this.masterLessonService.getAllMasters();
    return master;
  }

  @Post('/master')
  createMaster(@Body('name') name: string) {
    return this.masterLessonService.createMaster(name);
  }

  @Get('/lesson')
  getAllLesson(): Promise<Lesson[]> {
    const lesson = this.masterLessonService.getAllLessons();
    return lesson;
  }

  @Post('/lesson')
  createLesson(@Body('name') name: string) {
    return this.masterLessonService.createLesson(name);
  }
}
