import { RedisCacheService } from './global/utils/cache/redis-cache.service';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import AppConfig from './global/config/app.config';
import JwtConfig from './global/config/jwt.config';

@Injectable()
export class AppService {
  constructor(
    @Inject(AppConfig.KEY) private config: ConfigType<typeof AppConfig>,
    @Inject(JwtConfig.KEY) private jwtConfig: ConfigType<typeof JwtConfig>,
    private redisCacheService: RedisCacheService,
  ) {}

  async getHello() {
    const value = await this.redisCacheService.getWorkSpaceInvitedMember('5');
    return value;
  }

  async getTest(dto: { key: string; subkey: string; value: string }) {
    const { key, subkey, value } = dto;
    return await this.redisCacheService.setString(key, value, 100);
  }
}
