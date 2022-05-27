import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
@Injectable()
export class RedisCacheService {
  constructor(@InjectRedis() private readonly redis: Redis) {}
  async ping(): Promise<string> {
    return await this.redis.ping();
  }

  async getString(key: string): Promise<string> {
    return await this.redis.get(key);
  }

  async setString(key: string, value: string, ttl: number) {
    const result = await this.redis.set(key, value);
    await this.redis.expire(key, ttl);
    return result;
  }

  async getWorkSpaceInvitedMember(workSpaceId: string): Promise<string[]> {
    const stream = this.redis.scanStream({
      match: `invite-${workSpaceId}-*`,
    });
    const keys = await new Promise((res) => {
      const keysArray = [];
      stream.on('data', async (keys) => {
        keysArray.push(...keys);
      }),
        stream.on('end', () => {
          res(keysArray);
        });
    }).then((res: string[]) => {
      console.log('keys ', res);
      return res;
    });
    if (keys.length > 0) {
      const invitedMember = await this.redis.mget(keys);
      return invitedMember;
    }
    return [];
  }

  async deleteByKey(key: string): Promise<number> {
    return await this.redis.del(key);
  }
}
