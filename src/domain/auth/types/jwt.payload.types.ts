export interface JwtPayloadType {
  userId: number;
  email: string;
}

export class JwtPayload implements JwtPayloadType {
  iat: number;
  exp: number;
  userId: number;
  email: string;
}
