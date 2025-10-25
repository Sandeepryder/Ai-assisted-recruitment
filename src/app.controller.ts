import { Controller, Get } from '@nestjs/common';
import { ResumeController } from './modules/recruitment/controllers/resume.controller';

@Controller()
export class AppController {
  @Get()
  getRoot() {
    return { message: 'NestJS server is running!' };
  }

}
