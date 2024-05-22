import {
    Body,
    Controller,
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
    async createUser(@Body() CreateUserDTO: CreateUserDTO) {
        return await this.userService.addUser(CreateUserDTO.email);
    }
}
