import { GoogleGuard } from './guards/google.guards';
import { Controller, Get, Redirect, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/api/auth/google')
  @UseGuards(GoogleGuard)
  async googleLogin(@Req() req) {}

  @Get('/api/auth/google/callback')
  @UseGuards(GoogleGuard)
  async googleRedirect(@Req() req, @Res() res) {
    const Token: string = await this.authService.jwtOAuthLogin(req.user);
    res.cookie('jwt', 'tokenValue', { httpOnly: true });
    return res.redirect(`http://localhost:3000/auth?accessToken=${Token}`);
  }
}
