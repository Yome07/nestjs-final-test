import {
    AutoIncrement,
    Column,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';

@Table
export class Task extends Model<Task> {
    @PrimaryKey
    @AutoIncrement
    @Column
    taskId: number;

    @Column
    name: string;

    @Column
    userId: number;

    @Column
    priority: number;
}
