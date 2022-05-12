export interface userType {
  id: string;
  nickname: string;
}

export type roomUserType = {
  [key: string]: userType[];
};

export class JoinRoomRequest {
  room: string;
  nickname: string;
}
