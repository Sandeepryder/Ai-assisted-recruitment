import { Controller, Post, UseInterceptors, UploadedFile, Body, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResumeService } from '../services/resume.service';
import { memoryStorage } from 'multer';

@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Post('uploads')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(), // important: store file in memory
      limits: { fileSize: 5 * 1024 * 1024 }, // optional: max 5MB
    }),
  )
  async uploadResume(
    @UploadedFile() file: Express.Multer.File,
    @Body('candidateId') candidateIdString: string,
  ) {
    // Check if file is uploaded
    if (!file) {
      throw new BadRequestException('File not uploaded');
    }

    // Validate candidateId
    const candidateId = parseInt(candidateIdString, 10);
    if (isNaN(candidateId)) {
      throw new BadRequestException('Invalid candidateId');
    }

    // Call your service
    return this.resumeService.uploadResume(file, candidateId);
  }
}
