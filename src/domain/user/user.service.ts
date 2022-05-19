import { UserUpdateRequest } from './dto/request/user.update.request';
import { UserDto } from './dto/user.dto';
import { JwtPayloadType } from '../auth/types/jwt.payload.types';
import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { Builder } from 'builder-pattern';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUserInfo(user: JwtPayloadType): Promise<UserDto> {
    const { userId: id, email } = user;
    const findUser = await this.userRepository.findByUnique({ id });
    return UserDto.from(findUser);
  }

  async updateUser(
    user: JwtPayloadType,
    dto: UserUpdateRequest,
  ): Promise<UserDto> {
    const { userId: id } = user;
    const updateUser = await this.userRepository.updateUser(id, dto);
    return UserDto.from(updateUser);
  }
}
