import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidV4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(filterDto: GetTaskFilterDto): Task[] {
    let tasks: Task[] = [];
    if (Object.keys(filterDto).length) {
      tasks = this.getTasksWithFilters(filterDto);
    } else {
      tasks = this.getAllTasksParent();
    }
    return tasks;
  }

  private getAllTasksParent(): Task[] {
    if(!this.tasks.length){
      throw new NotFoundException("Task is empty")
    }
    return this.tasks;
  }

  private getTasksWithFilters(filterDto: GetTaskFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasksParent();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }
    return tasks;
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
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id != found.id) 
    return `Task with ID "${id}" has been deleted`;
  }

  updateTaskStatus(updateTaskStatusDto: UpdateTaskStatusDto): Task {
    const { id, status } = updateTaskStatusDto;
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
