import { WorkSpaceRepository } from './workspace.repository';
import { WorkSpaceCreateRequest } from './dto/request/workspace.create.request';
import { JwtPayloadType } from './../auth/types/jwt.payload.types';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class WorkSpaceService {
  constructor(private workSpaceRepository: WorkSpaceRepository) {}

  async createWorkSpace(
    user: JwtPayloadType,
    dto: WorkSpaceCreateRequest,
  ): Promise<string> {
    const { userId } = user;
    const { name: workSpaceName } = dto;

    const createdWorkSpace = this.workSpaceRepository.createWorkSpace(
      workSpaceName,
      userId,
    );

    return '워크스페이스 생성 성공';
  }
}
