import { UserUpdateRequest } from './dto/request/user.update.request';
import { Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/global/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async findByUnique(input: Prisma.UserWhereUniqueInput) {
    return await this.prisma.user.findUnique({ where: input });
  }

  async createUser(data: Prisma.UserCreateInput) {
    return await this.prisma.user.create({ data });
  }

  async updateUser(userId: number, data: UserUpdateRequest) {
    const { name, description } = data;
    return await this.prisma.user.update({
      where: { id: userId },
      data: { name, description },
    });
  }

  async findUserWithWorkSpace(input: Prisma.UserWhereUniqueInput) {
    return await this.prisma.user.findUnique({
      where: input,
      include: {
        workSpaceList: {
          include: {
            workSpace: true,
          },
        },
      },
    });
  }
}
