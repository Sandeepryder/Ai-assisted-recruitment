/// <reference types="multer" />
import { ScoringService } from './scoring.service';
export declare class ResumeService {
    private readonly scoringService;
    constructor(scoringService: ScoringService);
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
    extractText(file: Express.Multer.File): Promise<string>;
}
