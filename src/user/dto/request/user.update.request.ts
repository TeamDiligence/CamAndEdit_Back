import { IsString } from 'class-validator';

export class UserUpdateRequest {
  @IsString()
  name: string;

  @IsString()
  description: string;
}
