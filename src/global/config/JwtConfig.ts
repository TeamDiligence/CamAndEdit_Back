import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  access_expires: process.env.JWT_ACCESS_EXPIRES,
}));
