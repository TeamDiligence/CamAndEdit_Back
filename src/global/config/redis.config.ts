import { registerAs } from '@nestjs/config';

export default registerAs('redis', () => ({
  host: process.env.REDIS_URL,
  port: parseInt(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,
}));
