import { ResponseDto } from './../../global/response/response.dto';
import { WorkSpaceService } from './workspace.service';
import { JwtPayloadType } from './../../../dist/auth/types/jwt.payload.types.d';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guards';
import { User } from '../auth/jwt.decorator';
import { WorkSpaceCreateRequest } from './dto/request/workspace.create.request';

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
}
