import {
    AutoIncrement,
    BelongsTo,
    Column,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';
import { User } from '../user/user.model';

@Table
export class Task extends Model<Task> {
    @PrimaryKey
    @AutoIncrement
    @Column
    taskId: number;

    @Column
    name: string;

    @ForeignKey(() => User)
    @Column
    userId: number;

    @Column
    priority: number;

    @BelongsTo(() => User)
    user: User;
}
