import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { BCryptService } from '../auth/bcrypt.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, BCryptService],
  exports: [UsersService],
})
export class UsersModule {}
