import { IsEnum } from "class-validator";
import { TaskStatus } from "../task.model";

export class UpdateTaskStatusDto {
    id: string;
    @IsEnum(TaskStatus)
    status: TaskStatus;
  }