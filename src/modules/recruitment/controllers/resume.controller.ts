import {Controller,Post,UseInterceptors,UploadedFile, Body, } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResumeService } from '../services/resume.service';

@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Post('uploads')
  @UseInterceptors(FileInterceptor('file'))
  async uploadResume(
    @UploadedFile() file: Express.Multer.File,
    @Body('candidateId') candidateId: number,
  ) {
    // Ensure file exists
    if (!file) {
      throw new Error('File not uploaded');
    }

    return this.resumeService.uploadResume(file, candidateId);
  }
}
