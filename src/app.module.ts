import { WorkSpaceModule } from './domain/workspace/workspace.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './domain/auth/auth.module';
import { WebRtcGateway } from './gateway/web-rtc.gateway';
import AppConfig from './global/config/AppConfig';
import JwtConfig from './global/config/JwtConfig';
import { LoggerMiddleware } from './global/middleware/logger.middleware';
import { PrismaModule } from './global/prisma/prisma.module';
import { UserModule } from './domain/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [AppConfig, JwtConfig],
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    WorkSpaceModule,
  ],
  controllers: [AppController],
  providers: [AppService, WebRtcGateway],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
