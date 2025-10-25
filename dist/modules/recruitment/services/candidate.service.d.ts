import { PrismaService } from "./prisma.services";
export declare class CandidateService {
    private prisma;
    constructor(prisma: PrismaService);
    createCandidate(data: any): Promise<{
        success: boolean;
        data: {
            id: number;
            firstName: string;
            lastName: string;
            email: string;
            password: string;
            phone: string;
            jobId: number;
            score: number;
            scoreBreakdown: import("@prisma/client/runtime/library").JsonValue;
            status: string;
            createdAt: Date;
        };
    }>;
    getAllCandidates(): Promise<({
        job: {
            id: number;
            createdAt: Date;
            title: string;
            description: string;
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
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        phone: string;
        jobId: number;
        score: number;
        scoreBreakdown: import("@prisma/client/runtime/library").JsonValue;
        status: string;
        createdAt: Date;
    })[]>;
    getCandidate(id: number): Promise<{
        job: {
            id: number;
            createdAt: Date;
            title: string;
            description: string;
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
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        phone: string;
        jobId: number;
        score: number;
        scoreBreakdown: import("@prisma/client/runtime/library").JsonValue;
        status: string;
        createdAt: Date;
    }>;
    updateCandidate(id: number, data: any): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        phone: string;
        jobId: number;
        score: number;
        scoreBreakdown: import("@prisma/client/runtime/library").JsonValue;
        status: string;
        createdAt: Date;
    }>;
    deleteCandidate(id: number): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        phone: string;
        jobId: number;
        score: number;
        scoreBreakdown: import("@prisma/client/runtime/library").JsonValue;
        status: string;
        createdAt: Date;
    }>;
}
