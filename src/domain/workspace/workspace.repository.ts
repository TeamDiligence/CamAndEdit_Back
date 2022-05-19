import { Prisma, WorkSpace } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/global/prisma/prisma.service';

@Injectable()
export class WorkSpaceRepository {
  constructor(private prisma: PrismaService) {}

  async findByUnique(
    input: Prisma.WorkSpaceWhereUniqueInput,
  ): Promise<WorkSpace> {
    return await this.prisma.workSpace.findUnique({ where: input });
  }

  async createWorkSpace(name: string, userId: number) {
    return await this.prisma.workSpace.create({
      data: {
        name,
        member: {
          create: {
            userId,
            role: 'Admin',
          },
        },
      },
    });
  }
}
