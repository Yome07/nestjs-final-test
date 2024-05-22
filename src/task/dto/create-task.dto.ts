import { IsNotEmpty, IsInt, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateTaskDTO {
    id: number;

    @IsNotEmpty()
    name: string;

    @IsInt()
    @Min(1)
    @IsNotEmpty()
    userId: number;

    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    @IsInt()
    @Min(0)
    @IsNotEmpty()
    priority: string | number;
}
