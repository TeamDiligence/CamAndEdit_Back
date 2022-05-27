import { EmailModule } from './../email/email.module';
import { WorkSpaceRepository } from './workspace.repository';
import { WorkSpaceService } from './workspace.service';
import { Module } from '@nestjs/common';
import { WorkSpaceController } from './workspace.controller';
import { UserRepository } from '../user/user.repository';
import { RedisCacheModule } from 'src/global/utils/cache/redis-cache.module';

@Module({
  imports: [EmailModule, RedisCacheModule],
  controllers: [WorkSpaceController],
  providers: [WorkSpaceService, UserRepository, WorkSpaceRepository],
})
export class WorkSpaceModule {}
