import { TaskStatus } from '../task.model';

export class CreateTaskDto {
  description: string;
  title: string;
}

export class UpdateTaskStatusDto {
  id: string;
  status: TaskStatus;
}
