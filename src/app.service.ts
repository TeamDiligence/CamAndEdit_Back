import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import AppConfig from './global/config/AppConfig';

@Injectable()
export class AppService {
  constructor(
    @Inject(AppConfig.KEY) private config: ConfigType<typeof AppConfig>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }
}
