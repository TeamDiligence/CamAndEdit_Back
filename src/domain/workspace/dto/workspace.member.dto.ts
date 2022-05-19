import { Builder } from 'builder-pattern';
import { MemberRole, User } from '.prisma/client';

export class WorkSpaceMemberDto {
  userId: number;
  image: string;
  name: string;
  role: MemberRole;
  isInvite: boolean;

  public static from(workSpaceMember: workSpaceMemberAndUser) {
    return Builder<WorkSpaceMemberDto>()
      .name(workSpaceMember.user.name)
      .userId(workSpaceMember.userId)
      .image(workSpaceMember.user.image)
      .role(workSpaceMember.role)
      .isInvite(workSpaceMember.isInvite)
      .build();
  }
}

export type workSpaceMemberAndUser = {
  userId: number;
  workSpaceId: number;
  role: MemberRole;
  isInvite: boolean;
  user: User;
};
