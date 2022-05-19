import { WorkSpaceDto } from './../../workspace/dto/workspace.dto';
import { Builder } from 'builder-pattern';
import { User } from '.prisma/client';

export class UserDto {
  userId: number;
  email: string;
  name: string;
  description: string;
  image: string;
  workSpaceList?: WorkSpaceDto[];

  static from(user: User) {
    return Builder<UserDto>()
      .name(user.name)
      .email(user.email)
      .userId(user.id)
      .description(user.description)
      .build();
  }

  static fromWithWorkSpace(user: User, workSpaces: WorkSpaceDto[]) {
    return Builder<UserDto>()
      .name(user.name)
      .email(user.email)
      .userId(user.id)
      .description(user.description)
      .workSpaceList(workSpaces)
      .build();
  }
}
