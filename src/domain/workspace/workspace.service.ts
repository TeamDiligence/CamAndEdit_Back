import { Builder } from 'builder-pattern';
import { WorkSpaceMemberDto } from './dto/workspace.member.dto';
import { WorkSpaceRepository } from './workspace.repository';
import { WorkSpaceCreateRequest } from './dto/request/workspace.create.request';
import { JwtPayloadType } from './../auth/types/jwt.payload.types';
import { HttpException, Injectable } from '@nestjs/common';
import { WorkSpaceDto } from './dto/workspace.dto';
import { MemberRole } from '.prisma/client';

@Injectable()
export class WorkSpaceService {
  constructor(private workSpaceRepository: WorkSpaceRepository) {}

  async createWorkSpace(
    user: JwtPayloadType,
    dto: WorkSpaceCreateRequest,
  ): Promise<string> {
    const { userId } = user;
    const { name: workSpaceName } = dto;

    await this.workSpaceRepository.createWorkSpace(workSpaceName, userId);

    return '워크스페이스 생성 성공';
  }

  async findWorkSpace(workSpaceId: number): Promise<WorkSpaceDto> {
    const findWorkSpace = await this.workSpaceRepository.findByUnique({
      id: workSpaceId,
    });

    if (!findWorkSpace) {
      throw new HttpException('없는 워크스페이스입니다.', 400);
    }

    const workSpaceMembers: WorkSpaceMemberDto[] = [];

    findWorkSpace.member.map((member) => {
      workSpaceMembers.push(WorkSpaceMemberDto.from(member));
    });
    const adminUserId: number = workSpaceMembers.filter(
      (member) => member.role == MemberRole.Admin,
    )[0].userId;

    return Builder<WorkSpaceDto>()
      .id(findWorkSpace.id)
      .name(findWorkSpace.name)
      .adminUserId(adminUserId)
      .createdAt(findWorkSpace.createdAt)
      .memberList(workSpaceMembers)
      .meetingRoomList(findWorkSpace.meetingRoom)
      .build();
  }

  async getWorkSpaceUserList(workSpaceId: number, user: JwtPayloadType) {
    const findWorkSpace = await this.workSpaceRepository.findByUnique({
      id: workSpaceId,
    });

    if (!findWorkSpace) {
      throw new HttpException('없는 워크스페이스입니다.', 400);
    }

    return findWorkSpace.member.map((user) => {
      return {
        userId: user.userId,
        email: user.user.email,
        isInvite: user.isInvite,
        role: user.role,
        image: user.user.image,
      };
    });
  }
}
