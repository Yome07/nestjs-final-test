import {
    Body,
    ConflictException,
    Controller,
    HttpStatus,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @UsePipes(new ValidationPipe())
    async createUser(@Body() createUserDTO: CreateUserDTO) {
        const newUser = await this.userService.getUser(createUserDTO.email);
        if (newUser) {
            throw new ConflictException('User already exists');
        }
        const user = await this.userService.addUser(createUserDTO.email);

        return {
            statusCode: HttpStatus.CREATED,
            message: 'User created successfully',
            data: user,
        };
    }
}
