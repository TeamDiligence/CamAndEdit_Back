import { Builder } from 'builder-pattern';
import { MemberRole, User } from '.prisma/client';

export class WorkSpaceMemberDto {
  userId: number;
  image: string;
  name: string;
  role: MemberRole;

  public static from(workSpaceMember: workSpaceMemberAndUser) {
    return Builder<WorkSpaceMemberDto>()
      .name(workSpaceMember.user.name)
      .userId(workSpaceMember.userId)
      .image(workSpaceMember.user.image)
      .role(workSpaceMember.role)
      .build();
  }
}

export type workSpaceMemberAndUser = {
  userId: number;
  workSpaceId: number;
  role: MemberRole;
  user: User;
};
