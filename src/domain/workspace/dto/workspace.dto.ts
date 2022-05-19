import { workSpaceFindByUniqueType } from './../workspace.repository';
import { Builder } from 'builder-pattern';
import { MeetingRoom, MemberRole, User, WorkSpaceMember } from '.prisma/client';
import {
  WorkSpaceMemberDto,
  workSpaceMemberAndUser,
} from './workspace.member.dto';

export class WorkSpaceDto {
  id: number;
  name: string;
  adminUserId: number;
  createdAt: Date;
  memberList: WorkSpaceMemberDto[];
  meetingRoomList: MeetingRoom[];
}
