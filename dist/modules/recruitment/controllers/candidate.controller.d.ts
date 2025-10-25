import { CandidateService } from "../services/candidate.service";
export declare class CandidateController {
    private readonly candidateService;
    constructor(candidateService: CandidateService);
    createCandidate(body: {
        firstName: string;
        lastName: string;
        email: string;
        phone?: string;
        jobId: number;
    }): Promise<{
        success: boolean;
        data: {
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
        phone: string;
        jobId: number;
        score: number;
        scoreBreakdown: import("@prisma/client/runtime/library").JsonValue;
        status: string;
        createdAt: Date;
    })[]>;
    getCandidate(id: string): Promise<{
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
        phone: string;
        jobId: number;
        score: number;
        scoreBreakdown: import("@prisma/client/runtime/library").JsonValue;
        status: string;
        createdAt: Date;
    }>;
    updateCandidate(id: string, body: {
        firstName?: string;
        lastName?: string;
        email?: string;
        phone?: string;
        status?: string;
    }): Promise<{
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
    }>;
    deleteCandidate(id: string): Promise<{
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
    }>;
}
