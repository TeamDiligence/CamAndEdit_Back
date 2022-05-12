import { UserUpdateRequest } from './dto/request/user.update.request';
import { UserDto } from './dto/user.dto';
import { JwtPayloadType } from './../auth/types/jwt.payload.types';
import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { Builder } from 'builder-pattern';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUserInfo(user: JwtPayloadType): Promise<UserDto> {
    const { userId: id, email } = user;
    const findUser = await this.userRepository.findByUnique({ id });
    return Builder<UserDto>()
      .name(findUser.name)
      .email(findUser.email)
      .userId(findUser.id)
      .workspace([])
      .description(findUser.description)
      .build();
  }

  async updateUser(
    user: JwtPayloadType,
    dto: UserUpdateRequest,
  ): Promise<UserDto> {
    const { userId: id } = user;
    const updateUser = await this.userRepository.updateUser(id, dto);
    return Builder<UserDto>()
      .name(updateUser.name)
      .email(updateUser.email)
      .userId(updateUser.id)
      .workspace([])
      .description(updateUser.description)
      .build();
  }
}
