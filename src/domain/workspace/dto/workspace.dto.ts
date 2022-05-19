import { MeetingRoom } from '.prisma/client';
import { WorkSpaceMemberDto } from './workspace.member.dto';

export class WorkSpaceDto {
  id: number;
  name: string;
  adminUserId: number;
  createdAt: Date;
  memberList: WorkSpaceMemberDto[];
  meetingRoomList?: MeetingRoom[];
}
