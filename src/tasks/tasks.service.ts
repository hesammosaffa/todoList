import { Injectable } from '@nestjs/common';
import { Task } from './task.model';

@Injectable()
export class TasksService {
    private tasks: Task[] = []

    getAllTasks():Task[]{
        return this.tasks
    }

    addTask(task:Task){
        this.tasks.push(task)
    }
}
