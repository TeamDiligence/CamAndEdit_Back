import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebRtcGateway } from './gateway/web-rtc.gateway';
import AppConfig from './global/config/AppConfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        `${__dirname}/global/config/env/.${process.env.NODE_ENV}.env`,
      ],
      load: [AppConfig],
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, WebRtcGateway],
})
export class AppModule {}
