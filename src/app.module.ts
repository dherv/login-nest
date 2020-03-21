import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/users.entity';
import { UsersService } from './users/users.service';
import { BCryptService } from './auth/bcrypt.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot(),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, UsersService, BCryptService],
})
export class AppModule {}
