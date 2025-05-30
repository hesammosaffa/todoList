import { IsNotEmpty } from '@nestjs/class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  title: string;
}
