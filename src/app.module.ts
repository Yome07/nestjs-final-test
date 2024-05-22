import { AppRoutingModule } from './app.routing-module';
import { ConfigurationModule } from './infrastructure/configuration/configuration.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { config } from 'dotenv';

config();
@Module({
    imports: [
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.DB_HOST,
            // port: +process.env.DB_PORT,
            port: 24000,
            // username: process.env.DB_USERNAME,
            username: 'postgres',
            // password: process.env.DB_PASSWORD,
            password: 'postgres',
            // database: process.env.DB_DATABASE,
            database: 'nestjs-final-test-db',
            autoLoadModels: true,
            synchronize: true,
        }),
        AppRoutingModule,
        ConfigurationModule,
        DatabaseModule,
        UserModule,
    ],
})
export class AppModule {}
