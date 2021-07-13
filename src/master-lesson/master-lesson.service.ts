import { Injectable, NotFoundException } from '@nestjs/common';
import { Lesson } from './entity/lesson.entity';
import { Master } from './entity/master.entity';

@Injectable()
export class MasterLessonService {
  constructor(public MasterLessonService: MasterLessonService) {}

  async createMaster(name: string): Promise<Master> {
    const master = new Master();
    master.name = name;
    await master.save();

    return master;
  }

  async getAllMasters(): Promise<Master[]> {
    const master = Master.find({});

    if ((await master).length === 0) {
      throw new NotFoundException('Not found any data');
    }

    return master;
  }

  async createLesson(name: string): Promise<Lesson> {
    const lesson = new Lesson();
    lesson.name = name;
    await lesson.save();

    return lesson;
  }

  async getAllLessons() {
    const lesson = Lesson.find({});

    if ((await lesson).length === 0) {
      throw new NotFoundException('Not found any data');
    }

    return lesson;
  }
}
