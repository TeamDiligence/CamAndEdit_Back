import { Builder } from 'builder-pattern';
import { User } from '.prisma/client';

export class UserDto {
  userId: number;
  email: string;
  name: string;
  description: string;
  image: string;
  workspace: [];

  static from(user: User) {
    return Builder<UserDto>()
      .name(user.name)
      .email(user.email)
      .userId(user.id)
      .workspace([])
      .description(user.description)
      .build();
  }
}
