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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResumeService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const fs_1 = require("fs");
const path_1 = require("path");
const scoring_service_1 = require("./scoring.service");
const prisma = new client_1.PrismaClient();
let ResumeService = class ResumeService {
    constructor(scoringService) {
        this.scoringService = scoringService;
    }
    async uploadResume(file, candidateId) {
        const uploadDir = path_1.default.join(process.cwd(), 'uploads', 'resumes');
        await fs_1.promises.mkdir(uploadDir, { recursive: true });
        const uploadpath = path_1.default.join(uploadDir, `${candidateId}-${Date.now()}-${file.originalname}`);
        await fs_1.promises.writeFile(uploadpath, file.buffer);
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
exports.ResumeService = ResumeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [scoring_service_1.ScoringService])
], ResumeService);
//# sourceMappingURL=resume.service.js.map