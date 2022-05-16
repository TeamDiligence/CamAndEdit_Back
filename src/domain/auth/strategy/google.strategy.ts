import { JwtPayloadType } from './../types/jwt.payload.types';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { OauthGoogleUserType } from '../types/oauth.user.types';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService, private authService: AuthService) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile', 'openid'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const { sub, name, email, picture } = profile._json;
    const user: OauthGoogleUserType = {
      id: sub,
      email,
      name,
      provider: 'GOOGLE',
      image: picture,
    };

    const userInfo: JwtPayloadType = await this.authService.googleValidateUser(
      user,
    );

    done(null, userInfo);
  }
}
