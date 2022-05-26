import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import AppConfig from './global/config/app.config';
import JwtConfig from './global/config/jwt.config';

@Injectable()
export class AppService {
  constructor(
    @Inject(AppConfig.KEY) private config: ConfigType<typeof AppConfig>,
    @Inject(JwtConfig.KEY) private jwtConfig: ConfigType<typeof JwtConfig>,
  ) {}

  getHello(): string {
    console.log(this.jwtConfig.access_expires);
    return 'Hello World!';
  }
}
