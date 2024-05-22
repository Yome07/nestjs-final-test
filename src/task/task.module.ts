import { Module } from '@nestjs/common';
import { Task } from './task.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
    imports: [SequelizeModule.forFeature([Task])],
    controllers: [TaskController],
    providers: [TaskService],
    exports: [SequelizeModule],
})
export class TaskModule {}
