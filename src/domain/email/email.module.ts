import { Module } from '@nestjs/common';
import { RedisCacheModule } from 'src/global/utils/cache/redis-cache.module';
import { EmailService } from './email.service';

@Module({
  imports: [RedisCacheModule],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
