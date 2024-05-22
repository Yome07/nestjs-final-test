import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './task.model';
import { CreateTaskDTO } from './dto/create-task.dto';

@Injectable()
export class TaskService {
    successResponse: any;
    constructor(
        @InjectModel(Task)
        private taskModel: typeof Task,
    ) {}

    async addTask(
        name: string,
        userId: number,
        priority: string | number,
    ): Promise<CreateTaskDTO> {
        const priorityNumber =
            typeof priority === 'string' ? parseInt(priority, 10) : priority;
        if (isNaN(priorityNumber) || priorityNumber < 0) {
            throw new Error('Invalid priority');
        }

        const task = await this.taskModel.create({
            name,
            userId,
            priority: priorityNumber,
        });
        return {
            id: task.taskId,
            name: task.name,
            userId: task.userId,
            priority: task.priority,
        };
    }

    getTaskByName(name: string): Promise<Task> {
        return this.taskModel.findOne({
            where: {
                name,
            },
        });
    }

    async getUserTasks(userId: number): Promise<Task[]> {
        return this.taskModel.findAll({
            where: {
                userId,
            },
        });
    }

    async resetData(): Promise<void> {
        await this.taskModel.destroy({ where: {} });
    }
}
