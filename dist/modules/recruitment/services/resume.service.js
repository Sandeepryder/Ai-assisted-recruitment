"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ResumeService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResumeService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path = require("path");
const scoring_service_1 = require("./scoring.service");
const prisma_services_1 = require("./prisma.services");
let ResumeService = ResumeService_1 = class ResumeService {
    constructor(scoringService, prisma) {
        this.scoringService = scoringService;
        this.prisma = prisma;
        this.logger = new common_1.Logger(ResumeService_1.name);
    }
    async uploadResume(file, candidateIdInput) {
        var _a, _b;
        if (!file)
            throw new common_1.BadRequestException('File required');
        const candidateId = Number(candidateIdInput);
        if (Number.isNaN(candidateId) || !Number.isFinite(candidateId)) {
            throw new common_1.BadRequestException('Invalid candidateId');
        }
        const candidate = await this.prisma.candidate.findUnique({
            where: { id: candidateId },
        });
        if (!candidate) {
            throw new common_1.BadRequestException(`Candidate with id ${candidateId} does not exist`);
        }
        const uploadDir = path.join(process.cwd(), 'uploads', 'resumes');
        await fs_1.promises.mkdir(uploadDir, { recursive: true });
        const filename = `${candidateId}-${Date.now()}-${file.originalname}`;
        const uploadPath = path.join(uploadDir, filename);
        await fs_1.promises.writeFile(uploadPath, file.buffer);
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
        const parsedText = await this.extractText(file);
        this.logger.log(`Parsed Text (first 200 chars): ${String(parsedText).slice(0, 200)}`);
        const scoreData = await this.scoringService.scoreResume(candidateId, parsedText);
        this.logger.log('Score Data is: ' + JSON.stringify(scoreData));
        const parsed = await this.prisma.resumeParsed.upsert({
            where: { candidateId: candidateId },
            update: {
                text: parsedText,
                keywords: ((_a = scoreData === null || scoreData === void 0 ? void 0 : scoreData.matchedKeywords) === null || _a === void 0 ? void 0 : _a.length) ? JSON.stringify(scoreData.matchedKeywords) : null,
            },
            create: {
                candidate: { connect: { id: candidateId } },
                text: parsedText,
                keywords: ((_b = scoreData === null || scoreData === void 0 ? void 0 : scoreData.matchedKeywords) === null || _b === void 0 ? void 0 : _b.length) ? JSON.stringify(scoreData.matchedKeywords) : null,
            },
        });
        const updatedCandidate = await this.prisma.candidate.update({
            where: { id: candidateId },
            data: {
                score: scoreData.finalScore,
                scoreBreakdown: scoreData.breakdown ? scoreData.breakdown : null,
            },
        });
        return { resumeFile, parsed, updatedCandidate, path: uploadPath, score: scoreData };
    }
    async extractText(file) {
        if (file.mimetype.includes('pdf')) {
            const pdfParse = require('pdf-parse');
            const data = await pdfParse(file.buffer);
            return data.text;
        }
        else if (file.mimetype.includes('word') || file.mimetype.includes('docx')) {
            const mammoth = require('mammoth');
            const { value } = await mammoth.extractRawText({ buffer: file.buffer });
            return value;
        }
        return file.buffer.toString('utf-8');
    }
};
exports.ResumeService = ResumeService;
exports.ResumeService = ResumeService = ResumeService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [scoring_service_1.ScoringService,
        prisma_services_1.PrismaService])
], ResumeService);
//# sourceMappingURL=resume.service.js.map