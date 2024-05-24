import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
    ) {}

    async addUser(email: string): Promise<User> {
        return await this.userModel.create({ email });
    }

    async getUser(email: string): Promise<CreateUserDTO | null> {
        const user = await this.userModel.findOne({ where: { email } });
        if (user) {
            return { id: user.userId, email: user.email };
        }
        return null;
    }

    async resetData(): Promise<void> {
        try {
            await this.userModel.destroy({ where: {} });
        } catch (error) {
            console.error('Error while resetting data:', error);
        }
    }
}
