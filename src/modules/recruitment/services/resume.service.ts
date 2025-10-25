import { BadRequestException, Injectable ,InternalServerErrorException,Logger} from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { promises as fs } from "fs";
// import path from 'path';
import * as path from "path";
import { ScoringService } from "./scoring.service";
import { PrismaService } from "./prisma.services";
import pdfParse from "pdf-parse";

// const prisma = new PrismaClient();

@Injectable()
export class ResumeService {
    private readonly logger = new Logger(ResumeService.name);
  constructor(
    private readonly scoringService: ScoringService,
    private prisma: PrismaService
  ) {}

  async uploadResume(file: Express.Multer.File, candidateIdInput: number | string) {
    // const uploadDir = path.join(process.cwd(), "uploads", "resumes");
    // await fs.mkdir(uploadDir, { recursive: true });

    // const uploadpath = path.join(
    //   uploadDir,
    //   `${candidateId}-${Date.now()}-${file.originalname}`
    // );
    // // write file buffer to disk
    // await fs.writeFile(uploadpath, file.buffer);

    // // extract text from buffer (we still pass the original file for parsing)
    // const parsedText = await this.extractText(file);
    // console.log("Parsed Text is:", parsedText); // log first 200 chars

    // const scoreData = await this.scoringService.scoreResume(
    //   candidateId,
    //   parsedText
    // );
    // console.log("Score Data is:", scoreData);

    // const parsed = await this.prisma.resumeParsed.create({
    //   data: {
    //     candidateId: candidateId,
    //     keywords : ''+scoreData.matchedKeywords.join(','),
    //     text: parsedText
    //   },
    // });

    // await this.prisma.candidate.update({
    //   where: { id: candidateId },
    //   data: {
    //     score: scoreData.finalScore,
    //     scoreBreakdown: scoreData.breakdown,
    //   },
    // });

    // return { parsed, score: scoreData, path: uploadpath };
     if (!file) throw new BadRequestException('File required');

    // 1) normalize candidateId to number and validate
    const candidateId = Number(candidateIdInput);
    if (Number.isNaN(candidateId) || !Number.isFinite(candidateId)) {
      throw new BadRequestException('Invalid candidateId');
    }

    // 2) ensure candidate exists
    const candidate = await this.prisma.candidate.findUnique({
      where: { id: candidateId },
    });
    if (!candidate) {
      throw new BadRequestException(`Candidate with id ${candidateId} does not exist`);
    }

    // 3) save file to disk (optional)
    const uploadDir = path.join(process.cwd(), 'uploads', 'resumes');
    await fs.mkdir(uploadDir, { recursive: true });
    const uploadpath = path.join(uploadDir, `${candidateId}-${Date.now()}-${file.originalname}`);
    await fs.writeFile(uploadpath, file.buffer);

    // 4) extract text
    const parsedText = await this.extractText(file);
    this.logger.log(`Parsed Text (first 200 chars): ${String(parsedText).slice(0, 200)}`);

    // 5) score resume
    const scoreData = await this.scoringService.scoreResume(candidateId, parsedText);
    this.logger.log('Score Data is: ' + JSON.stringify(scoreData));

    // 6) if a parsed resume already exists for this candidate -> update, otherwise create
    try {
      // Because candidateId is @unique in ResumeParsed, we can use findUnique on candidateId
      const existingParsed = await this.prisma.resumeParsed.findUnique({
        where: { candidateId: candidateId },
      });

      let parsed;
      if (existingParsed) {
        // update existing parsed resume
        parsed = await this.prisma.resumeParsed.update({
          where: { id: existingParsed.id },
          data: {
            text: parsedText,
            keywords: scoreData?.matchedKeywords?.length ? JSON.stringify(scoreData.matchedKeywords) : null,
          },
        });
      } else {
        // create new parsed resume (connect with candidate)
        parsed = await this.prisma.resumeParsed.create({
          data: {
            // prefer relation connect form (safer)
            candidate: { connect: { id: candidateId } },
            text: parsedText,
            keywords: scoreData?.matchedKeywords?.length ? JSON.stringify(scoreData.matchedKeywords) : null,
          },
        });
      }

      // 7) update candidate's score (do as separate step)
      const updatedCandidate = await this.prisma.candidate.update({
        where: { id: candidateId },
        data: {
          score: scoreData.finalScore,
          scoreBreakdown: scoreData.breakdown ? scoreData.breakdown : null,
        },
      });

      return { parsed, updatedCandidate, path: uploadpath, score: scoreData };
    } catch (err) {
      this.logger.error('DB error while saving parsed resume', err);
      // if it's a Prisma known error we can inspect, else throw generic
      throw new InternalServerErrorException('Failed to save parsed resume');
    }
  }

  async extractText(file: Express.Multer.File) {
    if (file.mimetype.includes("pdf")) {
        const pdfParse = require("pdf-parse"); // require works best
        const data = await pdfParse(file.buffer);
        return data.text;
    } else if (file.mimetype.includes("word") || file.mimetype.includes("docx")) {
        const mammoth = require("mammoth");
        const { value } = await mammoth.extractRawText({ buffer: file.buffer });
        return value;
    }

    // fallback
    return file.buffer.toString("utf-8");
    }

}
