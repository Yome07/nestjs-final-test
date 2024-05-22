import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Param,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDTO } from './dto/create-task.dto';

@Controller()
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get('user/:userId')
    async getUserTasks(@Param('userId') userId: string) {
        const id = parseInt(userId, 10);
        if (isNaN(id) || id <= 0) {
            throw new BadRequestException('Invalid userId');
        }
        return await this.taskService.getUserTasks(id);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createTask(@Body() CreateTaskDTO: CreateTaskDTO) {
        return await this.taskService.addTask(
            CreateTaskDTO.name,
            CreateTaskDTO.userId,
            CreateTaskDTO.priority,
        );
    }
}
