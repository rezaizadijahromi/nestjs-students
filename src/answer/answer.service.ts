import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { QuestionService } from 'src/question/question.service';
import { Answer } from './entity/answers.entity';

@Injectable()
export class AnswerService {
  constructor(
    public answerService: AnswerService,
    public questionService: QuestionService,
  ) {}

  async getAllAnswers() {
    const answer = Answer.find({});

    if (answer) {
      return answer;
    }

    throw new NotFoundException('No answer data');
  }

  async createAnswer(title: string, description: string, questionId: string) {
    const questionExist = await this.questionService.getQuestion(questionId);

    if (!questionExist) {
      throw new NotFoundException(`Question with id: ${questionId} not found`);
    }

    const answer = new Answer();
    answer.title = title;
    answer.description = description;
    answer.questions = questionExist;

    console.log('first');

    // req.user.questionsAnswer.push(questionExist);
    console.log('second');

    // const isLiked =
    //     post.likes.filter((like) => like.user.toString() === userId).length > 0;

    // const userAnswerdQuestion = questionExist.userAnswers.filter(
    //   (usr) => usr.id === req.user.id,
    // );

    return answer;

    // if (!userAnswerdQuestion) {
    //   const newAnswer = {
    //     id: answer.id,
    //     title: answer.title,
    //     description: answer.description,
    //   } as Answer;
    //   questionExist.associatedAnswer.push(newAnswer);
    //   questionExist.userAnswers.push(req.user);
    //   console.log('third');

    //   await answer.save();
    //   await questionExist.save();

    //   return answer;
    // } else {
    //   throw new BadRequestException('You already answerd this question');
    // }
  }
}
