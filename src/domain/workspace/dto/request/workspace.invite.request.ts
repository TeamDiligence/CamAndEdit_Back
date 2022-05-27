import { IsEmail } from 'class-validator';

export class WorkSpaceInviteRequest {
  @IsEmail()
  email: string;
}
