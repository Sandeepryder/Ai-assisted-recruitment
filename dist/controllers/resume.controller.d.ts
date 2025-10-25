/// <reference types="multer" />
import { ResumeService } from '../services/resume.service';
export declare class ResumeController {
    private readonly resumeService;
    constructor(resumeService: ResumeService);
    uploadResume(file: Express.Multer.File, candidateId: number): Promise<{
        parsed: {
            id: number;
            candidateId: number;
            text: string;
            keywords: import("@prisma/client/runtime/library").JsonValue;
        };
        score: {
            finalScore: number;
            breakdown: {
                keywordScore: number;
                tfidfSimilarity: number;
                experienceScore: number;
            };
            matchedKeywords: string[];
        };
        path: string;
    }>;
}
