import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/user/user.repository';
import { JwtPayloadType } from './types/jwt.payload.types';
import { OauthGoogleUserType } from './types/oauth.user.types';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async googleValidateUser(user: OauthGoogleUserType) {
    const { id: snsId, provider, name, email, image } = user;
    let findUser = await this.userRepository.findByUnique({
      snsIdentify: { snsId, provider },
    });

    if (!findUser) {
      findUser = await this.userRepository.createUser({
        snsId,
        provider,
        name,
        email,
        image,
      });
    }

    return {
      userId: findUser.id,
      email: findUser.email,
    };
  }

  async jwtOAuthLogin(userPayload: JwtPayloadType): Promise<string> {
    return this.jwtService.sign(userPayload);
  }
}
