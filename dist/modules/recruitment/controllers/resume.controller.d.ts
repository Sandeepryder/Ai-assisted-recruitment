/// <reference types="multer" />
import { ResumeService } from '../services/resume.service';
export declare class ResumeController {
    private readonly resumeService;
    constructor(resumeService: ResumeService);
    uploadResume(file: Express.Multer.File, candidateIdString: string): Promise<{
        parsed: any;
        updatedCandidate: {
            id: number;
            firstName: string;
            lastName: string;
            email: string;
            phone: string;
            jobId: number;
            score: number;
            scoreBreakdown: import("@prisma/client/runtime/library").JsonValue;
            status: string;
            createdAt: Date;
        };
        path: string;
        score: {
            finalScore: number;
            breakdown: {
                keywordScore: number;
                tfidfSimilarity: number;
                experienceScore: number;
            };
            matchedKeywords: string[];
        };
    }>;
}
