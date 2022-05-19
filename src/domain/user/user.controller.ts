import { UserUpdateRequest } from './dto/request/user.update.request';
import { ResponseDto } from '../../global/response/response.dto';
import { UserService } from './user.service';
import { JwtPayloadType } from '../auth/types/jwt.payload.types';
import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/domain/auth/guards/jwt.guards';
import { User } from 'src/domain/auth/jwt.decorator';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/api/user')
  @UseGuards(JwtAuthGuard)
  async getUser(@User() user: JwtPayloadType) {
    const result = await this.userService.getUserInfo(user);
    return ResponseDto.OK_DATA('유저 조회 성공', result);
  }

  @Patch('/api/user')
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @User() user: JwtPayloadType,
    @Body() updateDto: UserUpdateRequest,
  ) {
    const result = await this.userService.updateUser(user, updateDto);
    return ResponseDto.OK_DATA('업데이트 성공', result);
  }
}
