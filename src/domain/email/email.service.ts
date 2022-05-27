import { RedisCacheService } from './../../global/utils/cache/redis-cache.service';
import { ConfigType } from '@nestjs/config';
import {
  HttpException,
  Inject,
  Injectable,
  CACHE_MANAGER,
} from '@nestjs/common';
import Mail from 'nodemailer/lib/mailer';
import * as nodemailer from 'nodemailer';
import emailConfig from 'src/global/config/email.config';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailService {
  private transporter: Mail;

  constructor(
    @Inject(emailConfig.KEY) private config: ConfigType<typeof emailConfig>,
    private redisCache: RedisCacheService,
  ) {
    this.transporter = nodemailer.createTransport({
      //   port: this.config.port,
      host: this.config.host,
      service: this.config.service,
      auth: {
        user: this.config.user,
        pass: this.config.password,
      },
    });
  }

  async sendInviteMail(email: string, workSpaceId: number): Promise<boolean> {
    const redirectValue =
      this.config.redirectUrl + `?email=${email}&workSpace=${workSpaceId}`;

    const mailValue: EmailOptions = {
      to: email,
      subject: 'CamAndEdit Invite Mail',
      html: `
            <div>
                <h2>CamAndEdit WorkSpace Invite Mail입니다.</h2>
                <p>아래 링크를 클릭해주세요.</p>
                <a href=${redirectValue} target="_blank">Invite</a>
            </div>
          `,
    };
    try {
      await this.transporter.sendMail(mailValue);
      await this.redisCache.setString(
        `invite-${workSpaceId}-${email}`,
        email,
        1800,
      );
      return true;
    } catch (err) {
      console.error(err);
      throw new HttpException('이메일 전송 실패', 500);
    }
  }
}
