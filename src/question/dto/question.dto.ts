import { IsNotEmpty } from 'class-validator';

export class createQuestionDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  remainingDay: number;
}
