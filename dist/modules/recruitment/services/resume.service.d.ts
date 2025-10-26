/// <reference types="multer" />
import { ScoringService } from "./scoring.service";
import { PrismaService } from "./prisma.services";
export declare class ResumeService {
    private readonly scoringService;
    private prisma;
    private readonly logger;
    constructor(scoringService: ScoringService, prisma: PrismaService);
    uploadResume(file: Express.Multer.File, candidateIdInput: number | string): Promise<{
        resumeFile: {
            id: number;
            candidateId: number;
            filename: string;
            path: string;
            mimetype: string;
            size: number;
            uploadedAt: Date;
        };
        parsed: {
            id: number;
            candidateId: number;
            text: string;
            keywords: import("@prisma/client/runtime/library").JsonValue;
        };
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
    extractText(file: Express.Multer.File): Promise<any>;
}
