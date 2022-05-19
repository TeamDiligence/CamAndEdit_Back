import { IsString, Length } from 'class-validator';

export class WorkSpaceCreateRequest {
  @IsString()
  @Length(4, 30)
  name: string;
}
