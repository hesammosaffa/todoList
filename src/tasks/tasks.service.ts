import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidV4 } from 'uuid';
import { CreateTaskDto, UpdateTaskStatusDto } from './dto/create-task.dto';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { description, title } = createTaskDto;
    const _task: Task = {
      id: uuidV4(),
      description,
      title,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(_task);
    return _task;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }

  deleteTaskById(id: string): string {
    const taskIndex = this.tasks.findIndex((task) => task.id);
    if (taskIndex == -1) {
      return `Task with ID "${id}" not found`;
    }
    this.tasks.splice(taskIndex, 1);
    return `Task with ID "${id}" has been deleted`;
  }

  updateTaskStatus(updateTaskStatusDto: UpdateTaskStatusDto): Task {
    const { id, status } = updateTaskStatusDto;
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
