import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { promises as fs } from 'fs';
import path from 'path';
import { ScoringService } from './scoring.service';

const prisma = new PrismaClient();

@Injectable()
export class ResumeService {
  constructor(private readonly scoringService: ScoringService) {}

  async uploadResume(file: Express.Multer.File, candidateId: number) {
    const uploadDir = path.join(process.cwd(), 'uploads', 'resumes');
    await fs.mkdir(uploadDir, { recursive: true });

    const uploadpath = path.join(uploadDir, `${candidateId}-${Date.now()}-${file.originalname}`);
    // write file buffer to disk
    await fs.writeFile(uploadpath, file.buffer);

    // extract text from buffer (we still pass the original file for parsing)
    const parsedText = await this.extractText(file);

    const scoreData = await this.scoringService.scoreResume(candidateId, parsedText);

    const parsed = await prisma.resumeParsed.create({
      data: {
        candidateId,
        text: parsedText,
        keywords: scoreData.matchedKeywords,
      },
    });

    await prisma.candidate.update({
      where: { id: candidateId },
      data: {
        score: scoreData.finalScore,
        scoreBreakdown: scoreData.breakdown,
      },
    });

    return { parsed, score: scoreData, path: uploadpath };
  }

  async extractText(file: Express.Multer.File): Promise<string> {
    if (file.mimetype.includes('pdf')) {
      const pdfParse = require('pdf-parse');
      const data = await pdfParse(file.buffer);
      return data.text as string;
    } else if (file.mimetype.includes('word') || file.mimetype.includes('docx')) {
      const mammoth = require('mammoth');
      const { value } = await mammoth.extractRawText({ buffer: file.buffer });
      return value;
    }
    return file.buffer.toString('utf-8');
  }
}
