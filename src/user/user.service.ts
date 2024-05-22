import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {
    successResponse: any;
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
    ) {}

    async addUser(email: string): Promise<CreateUserDTO> {
        const existingUser = await this.userModel.findOne({ where: { email } });
        if (existingUser) {
            throw new ConflictException('Email already exists');
        }
        const createUser = await this.userModel.create({ email });
        return { id: createUser.userId, email: createUser.email };
    }

    async getUser(email: string): Promise<CreateUserDTO> {
        const user = await this.userModel.findOne({
            where: {
                email,
            },
        });
        return { id: user.userId, email: user.email };
    }
    getUserById(id: number) {
        return this.userModel.findByPk(id);
    }

    async resetData(): Promise<void> {
        try {
            await this.userModel.destroy({ where: {} });
        } catch (error) {
            console.error('Error resetting data:', error);
        }
    }
}
