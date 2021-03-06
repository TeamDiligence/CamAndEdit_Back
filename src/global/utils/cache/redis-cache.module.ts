import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { RedisCacheService } from './redis-cache.service';
import { RedisModule } from '@liaoliaots/nestjs-redis';

@Module({
  imports: [
    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        readyLog: true,
        config: {
          host: config.get('redis.host'),
          port: config.get('redis.port'),
        },
      }),
    }),
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisCacheModule {}
