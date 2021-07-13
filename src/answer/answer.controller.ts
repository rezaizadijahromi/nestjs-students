import { Body, Controller, Param, Post, Req } from '@nestjs/common';
import { AnswerService } from './answer.service';

@Controller('answer')
export class AnswerController {
  constructor(private answerService: AnswerService) {}

  @Post('/:id/answer')
  createAnswer(
    // @Req() req: Profile,
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
  ) {
    const answer = this.answerService.createAnswer(title, description, id);

    return answer;
  }
}
