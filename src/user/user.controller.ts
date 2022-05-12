import { ResponseDto } from './../global/response/response.dto';
import { UserService } from './user.service';
import { JwtPayloadType } from './../auth/types/jwt.payload.types';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';
import { User } from 'src/auth/jwt.decorator';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/api/user')
  @UseGuards(JwtAuthGuard)
  async getUser(@User() user: JwtPayloadType) {
    const result = await this.userService.getUserInfo(user);
    return ResponseDto.OK_DATA('유저 조회 성공', result);
  }
}
