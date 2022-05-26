import type { RedisClientOptions } from 'redis';
import { ConfigService } from '@nestjs/config';
import { CacheModule, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { RedisCacheService } from './redis-cache.service';

@Module({
  imports: [
    CacheModule.registerAsync<RedisClientOptions>({
      useFactory: async (config: ConfigService) => ({
        store: redisStore,
        host: config.get('redis.url'),
        port: config.get('redis.port'),
        password: config.get('redis.password'),
        ttl: 600,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisCacheModule {}
