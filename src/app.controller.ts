import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { User } from './users/users.entity';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Res() res, @Request() req) {
    const token = await this.authService.login(req.user);
    return res.status(HttpStatus.OK).json(token);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('auth/register')
  async registerUser(@Res() res: any, @Body() body: User) {
    if (!(body && body.username && body.password && body.email)) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: 'Username and password are required!' });
    }

    let user = await this.userService.findOne(body.username);

    if (user) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: 'Username exists' });
    } else {
      user = await this.userService.create(body);
      delete user.password;
    }

    return res.status(HttpStatus.OK).json(user);
  }
}
