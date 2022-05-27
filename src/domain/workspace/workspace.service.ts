import { RedisCacheService } from './../../global/utils/cache/redis-cache.service';
import { EmailService } from './../email/email.service';
import { Builder } from 'builder-pattern';
import { WorkSpaceMemberDto } from './dto/workspace.member.dto';
import { WorkSpaceRepository } from './workspace.repository';
import { WorkSpaceCreateRequest } from './dto/request/workspace.create.request';
import { JwtPayloadType } from './../auth/types/jwt.payload.types';
import { HttpException, Injectable } from '@nestjs/common';
import { WorkSpaceDto } from './dto/workspace.dto';
import { MemberRole } from '.prisma/client';
import { WorkSpaceInviteRequest } from './dto/request/workspace.invite.request';

@Injectable()
export class WorkSpaceService {
  constructor(
    private workSpaceRepository: WorkSpaceRepository,
    private emailService: EmailService,
    private redisCache: RedisCacheService,
  ) {}

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
    const memberList = findWorkSpace.member.map((user) => {
      return {
        userId: user.userId,
        email: user.user.email,
        isInvite: user.isInvite,
        role: user.role,
        image: user.user.image,
      };
    });
    const inviteMember = await this.redisCache.getWorkSpaceInvitedMember(
      workSpaceId.toString(),
    );
    return {
      memberList,
      inviteMember: inviteMember,
    };
  }

  async inviteMember(
    workSpaceId: number,
    user: JwtPayloadType,
    dto: WorkSpaceInviteRequest,
  ) {
    const { email: sendEmail } = dto;
    const { userId } = user;

    const findMemberList =
      await this.workSpaceRepository.findWorkSpaceMemberList(workSpaceId);

    const adminUser = findMemberList.filter(
      (user) => user.userId === userId && user.role === MemberRole.Admin,
    );
    if (adminUser.length == 0) {
      throw new HttpException('권한 없음', 403);
    }

    const result = await this.emailService.sendInviteMail(
      sendEmail,
      workSpaceId,
    );

    return result;
  }
}
