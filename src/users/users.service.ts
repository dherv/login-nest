import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { BCryptService } from '../auth/bcrypt.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly bCryptService: BCryptService,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    const user = this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async findOneWithPassword(username: string): Promise<User | undefined> {
    const user = this.userRepository.findOne({
      where: { username },
      select: ['id', 'username', 'password'],
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async create(user: User): Promise<User> {
    user.password = await this.bCryptService.hash(user.password);
    return this.userRepository.save(user);
  }
}
