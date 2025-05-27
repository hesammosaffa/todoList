import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidV4 } from 'uuid';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(task: Pick<Task, 'title' | 'description'>): Task {
    const _task: Task = {
      id: uuidV4(),
      description: task.description,
      title: task.title,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(_task);
    return _task;
  }
}
