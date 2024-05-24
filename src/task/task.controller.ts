import {
    BadRequestException,
    Body,
    Controller,
    Get,
    InternalServerErrorException,
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
        const numericUserId = parseInt(userId, 10);
        if (isNaN(numericUserId) || numericUserId <= 0) {
            throw new BadRequestException('Invalid userId');
        }

        try {
            return await this.taskService.getUserTasks(numericUserId);
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createTask(@Body() createTaskDTO: CreateTaskDTO) {
        try {
            return await this.taskService.addTask(
                createTaskDTO.name,
                createTaskDTO.userId,
                Number(createTaskDTO.priority),
            );
        } catch (error) {
            console.error('Error creating task:', error);
            throw new BadRequestException(error.message);
        }
    }
}
