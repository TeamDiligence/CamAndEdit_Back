import { ConfigService, ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { RedisCacheService } from './redis-cache.service';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { async } from 'rxjs';

@Module({
  imports: [
    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        readyLog: true,
        config: {
          host: 'localhost',
          password: 'qwer1234',
          port: 6379,
        },
      }),
    }),
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisCacheModule {}
