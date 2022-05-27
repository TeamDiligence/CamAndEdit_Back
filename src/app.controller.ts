import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/get')
  async getHello() {
    return await this.appService.getHello();
  }

  @Post('/set')
  getTest(@Body() dto: { key: string; subkey: string; value: string }) {
    return this.appService.getTest(dto);
  }
}
