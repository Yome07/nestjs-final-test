import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './task.model';
import { CreateTaskDTO } from './dto/create-task.dto';

@Injectable()
export class TaskService {
    constructor(
        @InjectModel(Task)
        private taskModel: typeof Task,
    ) {}

    async addTask(
        name: string,
        userId: number,
        priority: number,
    ): Promise<CreateTaskDTO> {
        const task = await this.taskModel.create({
            name,
            userId,
            priority,
        });
        return await {
            id: task.id,
            name: task.name,
            userId: task.userId,
            priority: task.priority,
        };
    }

    async getUserTasks(userId: number): Promise<Task[]> {
        if (userId) {
            return this.taskModel.findAll({
                where: { userId },
            });
        }
    }

    async getTaskByName(name: string): Promise<Task> {
        return await this.taskModel.findOne({
            where: { name },
        });
    }

    async resetData(): Promise<void> {
        await this.taskModel.destroy({
            where: {},
        });
    }
}
