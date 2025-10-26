import { BadRequestException, Injectable ,InternalServerErrorException,Logger} from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { promises as fs } from "fs";
// import path from 'path';
import * as path from "path";
import { ScoringService } from "./scoring.service";
import { PrismaService } from "./prisma.services";
import pdfParse from "pdf-parse";


@Injectable()
export class ResumeService {
    private readonly logger = new Logger(ResumeService.name);
  constructor(
    private readonly scoringService: ScoringService,
    private prisma: PrismaService
  ) {}


async uploadResume(file: Express.Multer.File, candidateIdInput: number | string) {
  if (!file) throw new BadRequestException('File required');

  // 1) Normalize candidateId
  const candidateId = Number(candidateIdInput);
  if (Number.isNaN(candidateId) || !Number.isFinite(candidateId)) {
    throw new BadRequestException('Invalid candidateId');
  }

  // 2) Ensure candidate exists
  const candidate = await this.prisma.candidate.findUnique({
    where: { id: candidateId },
  });
  if (!candidate) {
    throw new BadRequestException(`Candidate with id ${candidateId} does not exist`);
  }

  // 3) Save file to disk
  const uploadDir = path.join(process.cwd(), 'uploads', 'resumes');
  await fs.mkdir(uploadDir, { recursive: true });
  const filename = `${candidateId}-${Date.now()}-${file.originalname}`;
  const uploadPath = path.join(uploadDir, filename);
  await fs.writeFile(uploadPath, file.buffer);

  // 4) Save ResumeFile metadata in DB
  const resumeFile = await this.prisma.resumeFile.upsert({
    where: { candidateId: candidateId },
    update: {
      filename: filename,
      path: uploadPath,
      mimetype: file.mimetype,
      size: file.size,
      uploadedAt: new Date(),
    },
    create: {
      candidate: { connect: { id: candidateId } },
      filename: filename,
      path: uploadPath,
      mimetype: file.mimetype,
      size: file.size,
    },
  });

  // 5) Extract text
  const parsedText = await this.extractText(file);
  this.logger.log(`Parsed Text (first 200 chars): ${String(parsedText).slice(0, 200)}`);

  // 6) Score resume
  const scoreData = await this.scoringService.scoreResume(candidateId, parsedText);
  this.logger.log('Score Data is: ' + JSON.stringify(scoreData));

  // 7) Save/update parsed resume
  const parsed = await this.prisma.resumeParsed.upsert({
    where: { candidateId: candidateId },
    update: {
      text: parsedText,
      keywords: scoreData?.matchedKeywords?.length ? JSON.stringify(scoreData.matchedKeywords) : null,
    },
    create: {
      candidate: { connect: { id: candidateId } },
      text: parsedText,
      keywords: scoreData?.matchedKeywords?.length ? JSON.stringify(scoreData.matchedKeywords) : null,
    },
  });

  // 8) Update candidate score
  const updatedCandidate = await this.prisma.candidate.update({
    where: { id: candidateId },
    data: {
      score: scoreData.finalScore,
      scoreBreakdown: scoreData.breakdown ? scoreData.breakdown : null,
    },
  });

  return { resumeFile, parsed, updatedCandidate, path: uploadPath, score: scoreData };
}

async extractText(file: Express.Multer.File) {
  if (file.mimetype.includes('pdf')) {
    const pdfParse = require('pdf-parse'); // require works best for PDF
    const data = await pdfParse(file.buffer);
    return data.text;
  } else if (file.mimetype.includes('word') || file.mimetype.includes('docx')) {
    const mammoth = require('mammoth');
    const { value } = await mammoth.extractRawText({ buffer: file.buffer });
    return value;
  }

  // fallback for text files
  return file.buffer.toString('utf-8');
}
}
