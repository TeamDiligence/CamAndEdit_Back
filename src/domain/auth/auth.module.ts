import { GoogleGuard } from './guards/google.guards';
import { GoogleStrategy } from './strategy/google.strategy';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from 'src/user/user.repository';
import { JwtAuthGuard } from './guards/jwt.guards';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get('jwt.secret'),
        signOptions: {
          expiresIn: config.get('jwt.access_expires'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    GoogleStrategy,
    GoogleGuard,
    AuthService,
    UserRepository,
    JwtAuthGuard,
    JwtStrategy,
  ],
})
export class AuthModule {}
