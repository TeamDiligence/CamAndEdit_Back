import { ResponseDto } from './../../global/response/response.dto';
import { WorkSpaceService } from './workspace.service';
import { JwtPayloadType } from './../../../dist/auth/types/jwt.payload.types.d';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guards';
import { User } from '../auth/jwt.decorator';
import { WorkSpaceCreateRequest } from './dto/request/workspace.create.request';
import { WorkSpaceInviteRequest } from './dto/request/workspace.invite.request';

@Controller()
export class WorkSpaceController {
  constructor(private workSpaceService: WorkSpaceService) {}

  @Post('/api/workspace')
  @UseGuards(JwtAuthGuard)
  async createWorkSpace(
    @User() user: JwtPayloadType,
    @Body() body: WorkSpaceCreateRequest,
  ) {
    const result = await this.workSpaceService.createWorkSpace(user, body);
    return ResponseDto.OK(result);
  }

  @Get('/api/workspace/:id')
  @UseGuards(JwtAuthGuard)
  async getWorkSpace(@Param('id') workSpaceId: number) {
    const result = await this.workSpaceService.findWorkSpace(workSpaceId);
    return ResponseDto.OK_DATA('워크스페이스 조회 성공', result);
  }

  @Get('/api/workspace/:id/users')
  @UseGuards(JwtAuthGuard)
  async getWorkSpaceUsers(
    @Param('id') workSpaceId: number,
    @User() user: JwtPayloadType,
  ) {
    const result = await this.workSpaceService.getWorkSpaceUserList(
      workSpaceId,
      user,
    );
    return ResponseDto.OK_DATA('워크 스페이스 유저 리스트', result);
  }

  @Post('/api/workspace/:id/invite')
  @UseGuards(JwtAuthGuard)
  async inviteWorkSpace(
    @Param('id') workSpaceId: number,
    @Body() dto: WorkSpaceInviteRequest,
    @User() user: JwtPayloadType,
  ) {
    await this.workSpaceService.inviteMember(workSpaceId, user, dto);
    return ResponseDto.OK('초대 메일 전송 성공');
  }
}
