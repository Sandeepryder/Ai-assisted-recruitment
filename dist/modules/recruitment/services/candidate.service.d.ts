import { PrismaService } from "./prisma.services";
export declare class CandidateService {
    private prisma;
    constructor(prisma: PrismaService);
    createCandidate(data: any): Promise<{
        success: boolean;
        data: {
            id: number;
            createdAt: Date;
            firstName: string;
            lastName: string;
            email: string;
            phone: string;
            jobId: number;
            score: number;
            scoreBreakdown: import("@prisma/client/runtime/library").JsonValue;
            status: string;
        };
    }>;
    getAllCandidates(): Promise<({
        job: {
            id: number;
            title: string;
            description: string;
            createdAt: Date;
            scoringKeywords: import("@prisma/client/runtime/library").JsonValue;
        };
        parsedResume: {
            id: number;
            candidateId: number;
            text: string;
            keywords: import("@prisma/client/runtime/library").JsonValue;
        };
    } & {
        id: number;
        createdAt: Date;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        jobId: number;
        score: number;
        scoreBreakdown: import("@prisma/client/runtime/library").JsonValue;
        status: string;
    })[]>;
    getCandidate(id: number): Promise<{
        job: {
            id: number;
            title: string;
            description: string;
            createdAt: Date;
            scoringKeywords: import("@prisma/client/runtime/library").JsonValue;
        };
        parsedResume: {
            id: number;
            candidateId: number;
            text: string;
            keywords: import("@prisma/client/runtime/library").JsonValue;
        };
    } & {
        id: number;
        createdAt: Date;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        jobId: number;
        score: number;
        scoreBreakdown: import("@prisma/client/runtime/library").JsonValue;
        status: string;
    }>;
    updateCandidate(id: number, data: any): Promise<{
        id: number;
        createdAt: Date;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        jobId: number;
        score: number;
        scoreBreakdown: import("@prisma/client/runtime/library").JsonValue;
        status: string;
    }>;
    deleteCandidate(id: number): Promise<{
        id: number;
        createdAt: Date;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        jobId: number;
        score: number;
        scoreBreakdown: import("@prisma/client/runtime/library").JsonValue;
        status: string;
    }>;
}
