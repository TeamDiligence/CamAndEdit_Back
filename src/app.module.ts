import { RedisCacheModule } from './global/utils/cache/redis-cache.module';
import { WorkSpaceModule } from './domain/workspace/workspace.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './domain/auth/auth.module';
import { WebRtcGateway } from './gateway/web-rtc.gateway';
import appConfig from './global/config/app.config';
import jwtConfig from './global/config/jwt.config';
import { LoggerMiddleware } from './global/middleware/logger.middleware';
import { PrismaModule } from './global/prisma/prisma.module';
import { UserModule } from './domain/user/user.module';
import redisConfig from './global/config/redis.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, jwtConfig, redisConfig],
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    WorkSpaceModule,
    RedisCacheModule,
  ],
  controllers: [AppController],
  providers: [AppService, WebRtcGateway],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
