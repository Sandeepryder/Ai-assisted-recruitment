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
exports.ScoringService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
let ScoringService = class ScoringService {
    constructor() { }
    async scoreResume(candidateId, text) {
        const job = await prisma.job.findFirst({
            where: { candidates: { some: { id: candidateId } } },
        });
        const jobKeywords = (job && job.scoringKeywords) || [];
        const tokens = this.tokenize(text || '');
        const matched = tokens.filter((t) => jobKeywords.includes(t));
        const keywordScore = jobKeywords.length ? Math.min(1, matched.length / jobKeywords.length) : 0;
        const tfidfSimilarity = this.computeTfidfSimilarity((job === null || job === void 0 ? void 0 : job.description) || '', text || '');
        const experienceScore = this.extractExperience(text || '');
        const weights = { w1: 0.45, w2: 0.35, w3: 0.15 };
        const finalScore = 100 * (weights.w1 * keywordScore + weights.w2 * tfidfSimilarity + weights.w3 * experienceScore);
        return {
            finalScore,
            breakdown: { keywordScore, tfidfSimilarity, experienceScore },
            matchedKeywords: matched,
        };
    }
    tokenize(text) {
        return (text || '')
            .toLowerCase()
            .replace(/[^a-z0-9 ]/g, '')
            .split(/\s+/)
            .filter(Boolean);
    }
    computeTfidfSimilarity(jobDesc, resume) {
        const jobWords = this.tokenize(jobDesc);
        const resumeWords = this.tokenize(resume);
        if (jobWords.length === 0 || resumeWords.length === 0)
            return 0;
        const common = jobWords.filter((w) => resumeWords.includes(w)).length;
        return common / Math.max(jobWords.length, resumeWords.length);
    }
    extractExperience(text) {
        const match = (text || '').match(/(\d+)\s*(years|yrs|year)/i);
        if (!match)
            return 0;
        const years = parseInt(match[1], 10);
        return Math.min(1, years / 5);
    }
};
exports.ScoringService = ScoringService;
exports.ScoringService = ScoringService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ScoringService);
//# sourceMappingURL=scoring.service.js.map