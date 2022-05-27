import {
  MeetingRoom,
  MemberRole,
  Prisma,
  User,
  WorkSpace,
  WorkSpaceMember,
} from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/global/prisma/prisma.service';

@Injectable()
export class WorkSpaceRepository {
  constructor(private prisma: PrismaService) {}

  async findByUnique(
    input: Prisma.WorkSpaceWhereUniqueInput,
  ): Promise<workSpaceFindByUniqueType> {
    return await this.prisma.workSpace.findUnique({
      where: input,
      include: {
        member: {
          include: {
            user: true,
          },
        },
        meetingRoom: true,
      },
    });
  }

  async createWorkSpace(name: string, userId: number) {
    return await this.prisma.workSpace.create({
      data: {
        name,
        member: {
          create: {
            userId,
            role: 'Admin',
            isInvite: true,
          },
        },
      },
    });
  }

  async findWithMemberByUserId(
    input: number,
  ): Promise<workSpaceFindByUserIdType[]> {
    return await this.prisma.workSpace.findMany({
      where: {
        member: {
          some: {
            userId: input,
          },
        },
      },
      include: {
        member: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async findWorkSpaceMemberList(workSpaceId: number) {
    return await this.prisma.workSpaceMember.findMany({
      where: {
        workSpaceId,
      },
      include: {
        user: true,
      },
    });
  }
}

export type workSpaceFindByUniqueType = WorkSpace & {
  member: (WorkSpaceMember & { user: User })[];
  meetingRoom: MeetingRoom[];
};

export type workSpaceFindByUserIdType = WorkSpace & {
  member: (WorkSpaceMember & { user: User })[];
};
