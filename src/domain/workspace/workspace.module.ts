import { WorkSpaceRepository } from './workspace.repository';
import { WorkSpaceService } from './workspace.service';
import { Module } from '@nestjs/common';
import { WorkSpaceController } from './workspace.controller';
import { UserRepository } from '../user/user.repository';

@Module({
  controllers: [WorkSpaceController],
  providers: [WorkSpaceService, UserRepository, WorkSpaceRepository],
})
export class WorkSpaceModule {}
