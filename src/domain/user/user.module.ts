import { WorkSpaceRepository } from './../workspace/workspace.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserRepository, UserService, WorkSpaceRepository],
})
export class UserModule {}
