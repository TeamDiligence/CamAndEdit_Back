import { WorkSpaceMemberDto } from './../workspace/dto/workspace.member.dto';
import { WorkSpaceDto } from './../workspace/dto/workspace.dto';
import { WorkSpaceRepository } from './../workspace/workspace.repository';
import { UserUpdateRequest } from './dto/request/user.update.request';
import { UserDto } from './dto/user.dto';
import { JwtPayloadType } from '../auth/types/jwt.payload.types';
import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { Builder } from 'builder-pattern';
import { MemberRole } from '.prisma/client';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private workSpaceRepository: WorkSpaceRepository,
  ) {}

  async getUserInfo(user: JwtPayloadType): Promise<UserDto> {
    const { userId: id } = user;
    const findUser = await this.userRepository.findUserWithWorkSpace({
      id,
    });
    const workspaces = await this.workSpaceRepository.findWithMemberByUserId(
      id,
    );

    const workSpaceDtoList: WorkSpaceDto[] = [];
    workspaces.map((wk) => {
      const workSpaceMembers: WorkSpaceMemberDto[] = [];
      wk.member.map((member) => {
        workSpaceMembers.push(WorkSpaceMemberDto.from(member));
      });
      const adminUserId: number = workSpaceMembers.filter(
        (member) => member.role == MemberRole.Admin,
      )[0].userId;
      workSpaceDtoList.push(
        Builder<WorkSpaceDto>()
          .id(wk.id)
          .name(wk.name)
          .adminUserId(adminUserId)
          .createdAt(wk.createdAt)
          .memberList(workSpaceMembers)
          .build(),
      );
    });
    return UserDto.fromWithWorkSpace(findUser, workSpaceDtoList);
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
